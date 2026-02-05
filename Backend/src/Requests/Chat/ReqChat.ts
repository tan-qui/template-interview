
export interface IMessage {
  content: string;
  role: "USER" | "ASSISTANT";
  createdAt: Date;
}
export interface IFileUpload {
  filename: string;
  data: string;
  mimeType: string;
  size: number; 
}

export interface ReqChat {
  userId: string;
  conversationId: string;
  message: IMessage;
  files?: IFileUpload[];
}