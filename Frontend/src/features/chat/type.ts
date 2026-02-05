import { ROLE } from "@/constants/enums";

export interface IMessage {
  content: string;
  sender: ROLE.USER | ROLE.ASSISTANT;
  createdAt: Date;
}

export interface IFileUpload {
  filename: string;
  data: string;
  mimeType: string;
  size: number; 
}


export interface IReqChatDTO {
  userId: string;
  conversationId: string;
  message: IMessage;
  files?: IFileUpload[];
}

export interface IResChatDTO {
  response: string;
  userId?: string;
  conversation: {
    id: string;
    title: string;
    createdAt: Date;
  }
}

export interface IReqConversationDTO {
  userId: string;
}

export interface IConversation {
  id: string;
  title: string;
  createdAt: Date;
}

export interface IResConversationDTO {
  lstConversation: IConversation[];
}


export interface IReqMessageDTO {
  conversationId: string;
}

export interface IResMessageDTO {
  lstMessage: IMessage[];
}

