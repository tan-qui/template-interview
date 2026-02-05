

import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat";
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface UploadedFile {
  filename: string;
  data: string; // base64
  mimeType: string;
  size?: number;
}

class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResponse(content: string, model: string = "gpt-4o-mini"): Promise<string> {
    try {
      const res = await this.client.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: content }],
      });
      return res.choices[0].message.content || "";
    } catch (error) {
      console.error("Error generating OpenAI response:", error);
      throw error;
    }
  }

  async generateResponseWithHistory(messages: ChatCompletionMessageParam[], model: string = "gpt-4o-mini"): Promise<string> {
    try {
      const res = await this.client.chat.completions.create({
        model: model,
        messages: messages,
      });

      return res.choices[0].message.content || "";
    } catch (error) {
      console.error("Error generating OpenAI response with history:", error);
      throw error;
    }
  }

  // Save base64 file to local storage
  private async saveBase64File(base64Data: string, mimeType: string, filename?: string): Promise<string> {
    const uploadsDir = path.join(process.cwd(), 'uploads', 'temp');
    
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileExtension = this.getFileExtension(mimeType);
    const fileName = filename || `${uuidv4()}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);

    // Convert base64 to buffer and save
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);

    return filePath;
  }

  private getFileExtension(mimeType: string): string {
    const mimeToExt: { [key: string]: string } = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'application/pdf': '.pdf',
      'text/plain': '.txt',
      'application/msword': '.doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
    };
    return mimeToExt[mimeType] || '.bin';
  }

  private isImageMimeType(mimeType: string): boolean {
    return mimeType.startsWith('image/');
  }

  // Process files from request body and generate response
  async generateResponseWithRequestFiles(
    content: string,
    files: UploadedFile[],
    model: string = "gpt-4o-mini"
  ): Promise<{ response: string; tempFiles: string[] }> {
    const tempFiles: string[] = [];
    
    try {
      const imageFiles: Array<{data: string, mimeType: string}> = [];
      const documentFiles: string[] = [];

      // Process each file
      for (const file of files) {
        if (this.isImageMimeType(file.mimeType)) {
          // Handle as image for vision
          imageFiles.push({
            data: file.data,
            mimeType: file.mimeType
          });
        } else {
          // Handle as document - save to local and upload to OpenAI
          const localPath = await this.saveBase64File(file.data, file.mimeType, file.filename);
          console.log('Saved document file to:', localPath);
          tempFiles.push(localPath);
          
          const fileId = await this.uploadFile(localPath);
          documentFiles.push(fileId);
        }
      }

      let response: string;
      
      if (imageFiles.length > 0 && documentFiles.length === 0) {
        // Only images - use vision
        response = await this.generateResponseWithBase64Images(content, imageFiles, model);
      } else if (documentFiles.length > 0 && imageFiles.length === 0) {
        // Only documents - use assistants
        response = await this.generateResponseWithUploadedFiles(content, documentFiles, model);
      } else if (imageFiles.length > 0 && documentFiles.length > 0) {
        // Mixed files - process separately and combine
        const imageResponse = await this.generateResponseWithBase64Images(
          `Analyze these images: ${content}`, 
          imageFiles, 
          model
        );
        
        const docResponse = await this.generateResponseWithUploadedFiles(
          `Analyze these documents: ${content}`, 
          documentFiles, 
          model
        );

        response = `**Image Analysis:**\n${imageResponse}\n\n**Document Analysis:**\n${docResponse}`;
        
        // Cleanup uploaded document files
        for (const fileId of documentFiles) {
          await this.deleteFile(fileId);
        }
      } else {
        // No files - fallback to text only
        response = await this.generateResponse(content, model);
      }

      return { response, tempFiles };
    } catch (error) {
      // Cleanup temp files on error
      for (const tempFile of tempFiles) {
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      }
      throw error;
    }
  }

  // Cleanup temporary files
  async cleanupTempFiles(filePaths: string[]): Promise<void> {
    for (const filePath of filePaths) {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (error) {
        console.error(`Error deleting temp file ${filePath}:`, error);
      }
    }
  }

  // Upload file to OpenAI for use with assistants
  async uploadFile(filePath: string, purpose: 'assistants' | 'fine-tune' = 'assistants'): Promise<string> {
    try {
      const file = await this.client.files.create({
        file: fs.createReadStream(filePath),
        purpose: purpose,
      });
      return file.id;
    } catch (error) {
      console.error("Error uploading file to OpenAI:", error);
      throw error;
    }
  }

  // Generate response with image files (vision)
  async generateResponseWithImage(
    content: string, 
    imageUrls: string[], 
    model: string = "gpt-4o-mini"
  ): Promise<string> {
    try {
      const imageContent = imageUrls.map(url => ({
        type: "image_url" as const,
        image_url: { url }
      }));

      const message: ChatCompletionMessageParam = {
        role: "user",
        content: [
          { type: "text", text: content },
          ...imageContent
        ]
      };

      const res = await this.client.chat.completions.create({
        model: model,
        messages: [message],
      });

      return res.choices[0].message.content || "";
    } catch (error) {
      console.error("Error generating OpenAI response with image:", error);
      throw error;
    }
  }

  // Generate response with base64 images
  async generateResponseWithBase64Images(
    content: string,
    base64Images: Array<{data: string, mimeType: string}>,
    model: string = "gpt-4o-mini"
  ): Promise<string> {
    try {
      const imageContent = base64Images.map(img => ({
        type: "image_url" as const,
        image_url: { 
          url: `data:${img.mimeType};base64,${img.data}`
        }
      }));

      const message: ChatCompletionMessageParam = {
        role: "user",
        content: [
          { type: "text", text: content },
          ...imageContent
        ]
      };

      const res = await this.client.chat.completions.create({
        model: model,
        messages: [message],
      });

      return res.choices[0].message.content || "";
    } catch (error) {
      console.error("Error generating OpenAI response with base64 images:", error);
      throw error;
    }
  }

  // Generate response with file uploads (for assistants)
  async generateResponseWithUploadedFiles(
    content: string,
    fileIds: string[],
    model: string = "gpt-4o-mini"
  ): Promise<string> {
    try {
      // Create assistant with file IDs
      const assistant = await this.client.beta.assistants.create({
        model: model,
        instructions: "You are a helpful assistant that can analyze uploaded files.",
        tools: [{ type: "file_search" }],
        tool_resources: {
          file_search: {
            vector_stores: [{
              file_ids: fileIds
            }]
          }
        }
      });

      // Create thread
      const thread = await this.client.beta.threads.create();

      // Add message to thread
      await this.client.beta.threads.messages.create(thread.id, {
        role: "user",
        content: content
      });

      // Run assistant
      const run = await this.client.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id
      });

      // Wait for completion
      let runStatus = await this.client.beta.threads.runs.retrieve(run.id, { thread_id: thread.id });
      while (runStatus.status !== 'completed') {
        if (runStatus.status === 'failed') {
          throw new Error(`Assistant run failed: ${runStatus.last_error?.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        runStatus = await this.client.beta.threads.runs.retrieve(run.id, { thread_id: thread.id });
      }

      // Get messages
      const messages = await this.client.beta.threads.messages.list(thread.id);
      const lastMessage = messages.data[0];
      
      // Cleanup
      await this.client.beta.assistants.delete(assistant.id);

      if (lastMessage.content[0].type === 'text') {
        return lastMessage.content[0].text.value;
      }

      return "No text response received";
    } catch (error) {
      console.error("Error generating OpenAI response with uploaded files:", error);
      throw error;
    }
  }

  // Delete uploaded file
  async deleteFile(fileId: string): Promise<boolean> {
    try {
      await this.client.files.delete(fileId);
      return true;
    } catch (error) {
      console.error("Error deleting file from OpenAI:", error);
      throw error;
    }
  }



}

export default new OpenAIService();