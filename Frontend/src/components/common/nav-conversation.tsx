"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { STATUS_CODE } from "@/constants/enums";
import { getAllConversation } from "@/features/chat/action";
import { IReqConversationDTO } from "@/features/chat/type";
import { helper } from "@/helper";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";
import { useLoadingStore } from "@/store/loading-store";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export const NavConversation = () => {
  const t = useTranslations();

  const { setLoading } = useLoadingStore();

  const {
    listConversation,
    currentConversationId,
    setConversationId,
    setListConversation,
  } = useChatStore();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const body: IReqConversationDTO = {
        userId: helper.getUserId(),
      };
      // console.log("Fetching conversations with body: ", body);
      const res = await getAllConversation(body);
      // console.log("res getAllConversation: ", res);
      if (res && res.code == STATUS_CODE.SUCCESS && res.data) {
        const conversations = Array.isArray(res.data.lstConversation) ? res.data.lstConversation : [];
        setListConversation(conversations);
      } else {
        setListConversation([]);
        const message = res?.message ?? t(String("Unknown error"));
        toast.error(message, {
          richColors: true,
          position: "top-right",
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error ", error);
      setListConversation([]);
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <SidebarMenu className="pb-4">
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/chat" className="bg-blue-500 text-white hover:bg-blue-600 rounded px-2 py-1 font-medium" 
            onClick={() => {
              setConversationId(null);
            }}>
              <span>+ {t("New Chat")}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {Array.isArray(listConversation) && listConversation.map((item, index: number) => (
        <SidebarMenu key={item.id || index} className="py-1" >
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={`/chat/${item.id}`} className={cn(" hover:bg-gray-300 rounded px-2 py-1",
                currentConversationId == item.id ? "bg-gray-200" : ""
              )}
                onClick={() => {
                  setConversationId(item.id);
                }}
              >
                <span>{item.title || `Unknown`}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      ))}
    </div>
  );
};
