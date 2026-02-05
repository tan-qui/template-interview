"use client";

import { Loading } from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ROLE, STATUS_CODE } from "@/constants/enums";
import { helper } from "@/helper";
import { useChatStore } from "@/store/chat-store";
import { Plus, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { getAllMessage, prompt } from "./action";
import { BotLoading } from "./components/bot-loading";
import { Intro } from "./components/intro";
import { Message } from "./components/message";
import { IFileUpload, IMessage, IReqChatDTO, IReqMessageDTO } from "./type";

export const ChatSuspense = ({ conversationId }: { conversationId?: string }) => {
  return (
    <Suspense
      fallback={
        <div className="relative p-4 h-full bg-muted">
          <Loading />
        </div>
      }
    >
      <Chat conversationId={conversationId} />
    </Suspense>
  );
};

const Chat = ({ conversationId }: { conversationId?: string }) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const {
    messages,
    isLoading,
    currentConversationId,
    addMessage,
    setLoading,
    resetStore,
    setConversationId,
    addItemConversation,
    clearMessages
  } = useChatStore();

  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<IFileUpload[]>([]);

  useEffect(() => {
    if (conversationId) {
      clearMessages();
      setConversationId(conversationId || null);
      getInitialMessage();
    }
  }, [conversationId, clearMessages]);

  useEffect(() => {
    return () => {
      resetStore();
      clearMessages();
    };
  }, [resetStore]);

  useEffect(() => {
    // Auto scroll to bottom when new message is added
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const getInitialMessage = async () => {
    try {
      const body: IReqMessageDTO = {
        conversationId: conversationId || "",
      }
      const res = await getAllMessage(body);
      // console.log("Initial messages response:", res);
      if (res && res.code == STATUS_CODE.SUCCESS && res.data) {
        clearMessages();
        for (const message of res.data.lstMessage) {
          const itemAdd: IMessage = {
            content: message.content,
            sender: message.sender,
            createdAt: new Date(message.createdAt)
          };
          // console.log("Adding initial message:", itemAdd);
          addMessage(itemAdd);
        }
      }
    } catch (error) {
      console.error("Error loading initial messages:", error);
      const errorMessage: IMessage = {
        content: "Sorry, there was an error loading the conversation. Please try again.",
        sender: ROLE.ASSISTANT,
        createdAt: new Date()
      };
      addMessage(errorMessage);
    }
  }

  // Chat service instance
  const handleSendMessage = async () => {
    // console.log("handleSendMessage called", selectedFiles);
    if (!inputValue.trim() && selectedFiles.length === 0) return;
    const currentUserId = helper.getUserId();
    const userMessage: IMessage = {
      content: inputValue,
      sender: ROLE.USER,
      createdAt: new Date()
    };
    addMessage(userMessage);
    setInputValue("");
    setLoading(true);
    try {
      const body: IReqChatDTO = {
        userId: currentUserId,
        conversationId: currentConversationId || "",
        message: userMessage,
        files: selectedFiles
      }
      const res = await prompt(body);
      // console.log("Chat response:", res);
      if (res && res.code == STATUS_CODE.SUCCESS && res.data) {
        if (res.data.userId) {
          const currentStoredUserId = helper.getUserId();
          if (!currentStoredUserId || currentStoredUserId !== res.data.userId) {
            helper.saveUserId(res.data.userId);
          }
        }
        if (res.data.conversation.id && !currentConversationId) {
          addItemConversation({
            id: res.data.conversation.id,
            title: res.data.conversation.title,
            createdAt: new Date(res.data.conversation.createdAt)
          });
          setConversationId(res.data.conversation.id);
          // window.history.replaceState(null, "", `/chat/${res.data.conversation.id}`);
        }
        const assistantMessage: IMessage = {
          content: res.data.response,
          sender: ROLE.ASSISTANT,
          createdAt: new Date(res.data.conversation.createdAt)
        };
        addMessage(assistantMessage);
      } else {
        const message = res?.message ?? "Sorry, I couldn't process your request";
        const assistantMessage: IMessage = {
          content: message,
          sender: ROLE.ASSISTANT,
          createdAt: new Date()
        };
        addMessage(assistantMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: IMessage = {
        content: "Sorry, there was an error processing your request. Please try again.",
        sender: ROLE.ASSISTANT,
        createdAt: new Date()
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
      setSelectedFiles([]);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      }
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    // console.log("Files selected:", files);
    try {
      // Convert files to IFileUpload[] using Promise.all for better performance
      const fileUploads = await Promise.all(
        files.map(async (file): Promise<IFileUpload> => {
          // Add file validation here
          if (file.size > 10 * 1024 * 1024) { // 10MB limit
            throw new Error(`File ${file.name} is too large (max 10MB)`);
          }
          const base64 = await convertFileToBase64(file);
          return {
            filename: file.name,
            data: base64,
            mimeType: file.type,
            size: file.size
          };
        })
      );
      // console.log("Converted file uploads:", fileUploads);
      setSelectedFiles(prev => [...prev, ...fileUploads]);
      // Reset input to allow selecting same file again
      e.target.value = '';
    } catch (error) {
      console.error("Error converting files to base64:", error);
      e.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };


  return (
    <div className="relative h-full w-full mx-auto bg-gray-50/50">
      {/* Chat Messages Area - Scrollable with padding for fixed input */}
      <div className="absolute inset-0 pb-20">
        <div className="h-full max-w-3xl mx-auto">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="px-4 py-6 pb-8">
              <div className="space-y-6">
                {messages.length === 0 && !conversationId && (
                  <Intro />
                )}
                {messages.length > 0 && (
                  <Message />
                )}
                {isLoading && (
                  <BotLoading />
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Chat Input Area - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t bg-white/95 backdrop-blur-sm p-4">
        <div className="max-w-3xl mx-auto">

          {selectedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm"
                >
                  <span className="truncate max-w-32">{file.filename}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 h-10 w-10"
              disabled={isLoading}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <div className="flex-1 relative">
              <Textarea
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                onKeyDown={handleKeyPress}
                placeholder={t("Type your message here")}
                className="min-h-[40px] max-h-[200px] resize-none pr-12"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={(!inputValue.trim() && selectedFiles.length === 0) || isLoading}
              className="flex-shrink-0 h-10 px-4"
            >
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? t("Generating") : t("Send")}
            </Button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
          accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
        />

      </div>
    </div>
  );
};
