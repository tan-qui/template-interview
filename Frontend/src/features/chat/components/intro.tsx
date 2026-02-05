import { Card, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";

export const Intro = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
        <Bot className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        {t("Welcome to AI Chat")}
      </h2>
      <p className="text-gray-600 text-lg mb-8 max-w-md">
        {t("Start a conversation by typing a message below I'm here to help with any questions or tasks you have")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-dashed">
          <CardContent className="p-0">
            <p className="text-sm font-medium text-gray-700">💡 {t("Ask me anything")}</p>
            <p className="text-xs text-gray-500 mt-1">{t("Get answers to your questions")}</p>
          </CardContent>
        </Card>
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-dashed">
          <CardContent className="p-0">
            <p className="text-sm font-medium text-gray-700">📝 {t("Help with writing")}</p>
            <p className="text-xs text-gray-500 mt-1">{t("Draft emails, content, and more")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
