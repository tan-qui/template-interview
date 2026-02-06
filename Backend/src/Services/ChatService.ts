import { RowDataPacket } from "mysql2/typings/mysql/lib/protocol/packets/RowDataPacket";
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from "../Constants/Constant";
import dbPool from "../Database/Mysql";
import { ReqChat } from "../Requests/Chat/ReqChat";
import { ReqConversation } from "../Requests/Chat/ReqConversation";
import { ReqMessage } from "../Requests/Chat/ReqMessage";
import OpenAIService from "./OpenAIService";

class ChatService {
  constructor() {

  }

  async prompt(req: any) {
    var dbConn;
    try {
      const body: ReqChat = req.body;
      console.log('body:', body);
      const now = new Date();
      dbConn = await dbPool.getConnection();
      // Start transaction
      await dbConn.beginTransaction();
      // Step 1: Ensure user and conversation exist
      let userId = body.userId || uuidv4();
      const [user] = await dbConn.query("SELECT * FROM users WHERE id = ?", [userId]) as RowDataPacket[];
      if (user.length == 0) {
        console.log('Creating new user with ID:', userId);
        // create new user
        const name = `Unknown-${userId.substring(0, 5)}`;
        await dbConn.query("INSERT INTO users (id, name, status, createdAt) VALUES (?, ?, ?, ?)", [userId, name, 'ACTIVE', now]) as RowDataPacket[];
      }
      // Step 2: Ensure conversation exists
      let conversationId = body.conversationId || uuidv4();
      const [conversation] = await dbConn.query("SELECT * FROM conversations WHERE id = ?", [conversationId]) as RowDataPacket[];
      // create new conversation
      const title = body.message.content.length > 20 ? body.message.content.substring(0, 20) : body.message.content;
      if (conversation.length == 0) {
        console.log('Creating new conversation for conversation ID:', conversationId);
        await dbConn.query("INSERT INTO conversations (id, userId, title, createdAt) VALUES (?, ?, ?, ?)", [conversationId, userId, title, now]) as RowDataPacket[];
      }
      // Step 3: Save user message to database
      await dbConn.query("INSERT INTO messages (conversationId, sender, content, createdAt) VALUES (?, ?, ?, ?)", [conversationId, 'USER', body.message.content, now]);
      // Commit transaction
      await dbConn.commit();
      // Step 4: Get conversation history for context
      const [messageHistory] = await dbConn.query(
        "SELECT sender, content FROM messages WHERE conversationId = ? ORDER BY createdAt ASC",
        [conversationId]
      ) as RowDataPacket[];
      console.log('messageHistory:', messageHistory);
      // Build messages array for OpenAI
      const messages = messageHistory.map((msg: any) => ({
        role: msg.sender === 'USER' ? 'user' : 'assistant',
        content: msg.content
      }));
      console.log('messages for OpenAI:', messages);
      // Step 5: Call OpenAI API
      let aiResponse: string;
      // Code fake to bypass OpenAI API key requirement
      if (process.env.OPENAI_API_KEY === undefined || process.env.OPENAI_API_KEY === "") {
        aiResponse = "This is a fake response as OPENAI_API_KEY is not set in environment variables";
      } else {
        if (body.files && body.files.length > 0) {
          const result = await OpenAIService.generateResponseWithRequestFiles(
            body.message.content,
            body.files
          );
          aiResponse = result.response;
        } else {
          aiResponse = await OpenAIService.generateResponseWithHistory(messages);
        }
      }
      console.log('AI Response:', aiResponse);
      // Step 6: Save AI response to database
      await dbConn.query(
        "INSERT INTO messages (conversationId, sender, content, createdAt) VALUES (?, ?, ?, ?)",
        [conversationId, 'ASSISTANT', aiResponse, now]
      );
      return {
        code: StatusCode.SUCCESS,
        message: StatusCode.SUCCESS,
        data: {
          userId: userId,
          conversation: {
            id: conversationId,
            title: title,
            createdAt: now
          },
          response: aiResponse,
        }
      };
    } catch (err: any) {
      console.log('Error in prompt:', err);
      return {
        code: StatusCode.FAIL,
        message: err.message,
        data: {}
      };
    } finally {
      if (dbConn) {
        dbConn.release();
      }
    }
  }

  async conversationAll(req: any) {
    var dbConn;
    try {
      const body: ReqConversation = req.body;
      console.log('body:', body);
      const now = new Date();
      dbConn = await dbPool.getConnection();
      const [rows] = await dbConn.query("SELECT id, title, createdAt FROM conversations WHERE userId = ?", [body.userId]) as RowDataPacket[];
      return {
        code: StatusCode.SUCCESS,
        message: StatusCode.SUCCESS,
        data: {
          lstConversation: rows
        }
      };
    } catch (err: any) {
      console.log('Error in conversationAll:', err);
      return {
        code: StatusCode.FAIL,
        message: err.message,
        data: {}
      };
    } finally {
      if (dbConn) {
        dbConn.release();
      }
    }
  }

  async messageAll(req: any) {
    var dbConn;
    try {
      const body: ReqMessage = req.body;
      console.log('body:', body);
      dbConn = await dbPool.getConnection();
      const [rows] = await dbConn.query(
        `SELECT m.*,
                c.title, 
                u.name 
         FROM messages m
         JOIN conversations c ON m.conversationId = c.id
         JOIN users u ON c.userId = u.id
         WHERE c.id = ?`,
        [body.conversationId]
      ) as RowDataPacket[];
      return {
        code: StatusCode.SUCCESS,
        message: StatusCode.SUCCESS,
        data: {
          lstMessage: rows
        }
      };
    } catch (err: any) {
      console.log('Error in messageAll:', err);
      return {
        code: StatusCode.FAIL,
        message: err.message,
        data: {}
      };
    } finally {
      if (dbConn) {
        dbConn.release();
      }
    }
  }


}

export default new ChatService();