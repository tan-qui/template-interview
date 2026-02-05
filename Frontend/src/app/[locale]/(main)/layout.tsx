import { AppHeader } from "@/components/common/app-header";
import { AppSidebar } from "@/components/common/app-sidebar";
import { Loading } from "@/components/common/loading";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";

type Props = {
  children: ReactNode;
};

export default async function MainLayout({ children }: Props) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-hidden">
          <AppHeader />
          <Suspense fallback={null}>{children}</Suspense>
        </SidebarInset>
      </SidebarProvider>
      <ScrollToTop />
      <Loading />
      <Toaster />
    </>
  );
}
