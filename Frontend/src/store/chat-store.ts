import { IConversation, IMessage } from '@/features/chat/type';
import { create } from 'zustand';

interface ChatStore {
  listConversation: IConversation[];
  messages: IMessage[];
  isLoading: boolean;
  currentConversationId: string | null;
  // Actions
  setListConversation: (conversations: IConversation[]) => void;
  addItemConversation: (conversation: IConversation) => void;
  addMessage: (message: IMessage) => void;
  setMessages: (messages: IMessage[]) => void;
  setLoading: (loading: boolean) => void;
  setConversationId: (id: string | null) => void;
  clearMessages: () => void;
  resetStore: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  listConversation: [],
  messages: [],
  isLoading: false,
  currentConversationId: null,

  setListConversation: (conversations) =>
    set({ listConversation: conversations }),

  addItemConversation: (conversation) =>
    set((state) => ({
      listConversation: [conversation, ...state.listConversation]
    })),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message]
    })),

  setMessages: (messages) =>
    set({ messages }),

  setLoading: (isLoading) =>
    set({ isLoading }),

  setConversationId: (currentConversationId) =>
    set({ currentConversationId }),

  clearMessages: () =>
    set({ messages: [] }),

  resetStore: () =>
    set({
      messages: [],
      isLoading: false,
      currentConversationId: null
    }),
}));