import { BaseService } from "@/services/base.service"
import { IReqChatDTO, IReqConversationDTO, IReqMessageDTO, IResChatDTO, IResConversationDTO, IResMessageDTO } from "./type"

class ChatService extends BaseService {
  constructor() {
    super()
  }

  async prompt(body: IReqChatDTO) {
    return this.post<IResChatDTO>("/chat/prompt", body)
  }

  async getAllConversation(body: IReqConversationDTO) {
    return this.post<IResConversationDTO>("/chat/conversation-all", body)
  }

  async getAllMessage(body: IReqMessageDTO) {
    return this.post<IResMessageDTO>("/chat/message-all", body)
  }

}

export const chatService = new ChatService()
