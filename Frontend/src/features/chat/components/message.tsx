import { Card, CardContent } from "@/components/ui/card";
import { ROLE } from "@/constants/enums";
import { useChatStore } from "@/store/chat-store";
import { Bot, User } from "lucide-react";
import { IMessage } from "../type";

export const Message = () => {

  const {
    messages,
  } = useChatStore();

  return (
    <>
      {
        messages.map((message: IMessage, idx) => (
          <div
            key={idx}
            className={`flex gap-4 ${message.sender == ROLE.USER ? "justify-end" : "justify-start"}`}
          >
            {message.sender == ROLE.ASSISTANT && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}

            <div className={`flex flex-col max-w-[85%] ${message.sender == ROLE.USER ? "items-end" : "items-start"}`}>
              <Card className={`${message.sender == ROLE.USER
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-50 border-gray-200"
                } shadow-sm py-2`}>
                <CardContent className="p-2">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </CardContent>
              </Card>
              <span className="text-xs text-gray-500 mt-2 px-2">
                {message.createdAt.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            {message.sender == ROLE.USER && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))
      }
    </>
  );
};
