"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Bot } from "lucide-react";
import Link from "next/link";

export const AppLogo = () => {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/">
            {open ? (
              <div className="flex gap-2 w-full items-center justify-start transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span
                  className="text-lg font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{ opacity: 0, animation: "fadeIn 200ms ease 300ms forwards" }}
                >
                  Big Assistant
                </span>
                <style jsx>{`
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                      transform: translateY(-4px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </div>
            ) : (
              <div className="transition-all">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-2 h-2 text-white" />
                </div>
              </div>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
