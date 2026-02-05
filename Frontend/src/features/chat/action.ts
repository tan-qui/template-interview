'use server';

import { chatService } from "./service";
import { IReqChatDTO, IReqConversationDTO, IReqMessageDTO } from "./type";

export const prompt = async (body: IReqChatDTO) => {
  return await chatService.prompt(body);
};

export const getAllConversation = async (body: IReqConversationDTO) => {
  return await chatService.getAllConversation(body);
};


export const getAllMessage = async (body: IReqMessageDTO) => {
  return await chatService.getAllMessage(body);
};