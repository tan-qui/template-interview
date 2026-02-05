"use client";

import { Sidebar, SidebarTrigger } from "@/components/ui/sidebar";
import * as React from "react";

export function AppHeader({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="ml-auto mr-4">
        <div className="flex items-center gap-1">
          {/* TODO */}
        </div>
      </div>
    </header>
  );
}
