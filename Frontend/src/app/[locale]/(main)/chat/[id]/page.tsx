import { ChatSuspense } from "@/features/chat";

interface ChatConversationPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function ChatConversationPage({ params }: ChatConversationPageProps) {
  const { id } = await params;
  return <ChatSuspense conversationId={id} />;
}