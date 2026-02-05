"use client";

import * as React from "react";

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { AppLogo } from "./app-logo";
import { Suspense } from "react";
import { NavConversation } from "./nav-conversation";

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <Suspense fallback={null}>
          <NavConversation />
        </Suspense>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
