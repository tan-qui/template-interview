import { Card, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";

export const BotLoading = () => {
  const t = useTranslations();
  return (
    <>
      <div className="flex gap-4 justify-start">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col items-start">
          <Card className="bg-gray-50 border-gray-200 shadow-sm py-2">
            <CardContent className="p-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </CardContent>
          </Card>
          <span className="text-xs text-gray-500 mt-2 px-2">
            {t("AI is thinking")}
          </span>
        </div>
      </div>
    </>
  );
};
