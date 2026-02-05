import { ChatSuspense } from "@/features/chat";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return { title: `${t("Chat with Big Assistant")}` };
};

export default async function Page() {
  return (
    <div className="bg-muted flex flex-1 p-2">
      <ChatSuspense />
    </div>
  );
}
