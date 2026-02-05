"use client";
import { useLoadingStore } from "@/store/loading-store";
import { LoaderIcon } from "lucide-react";

export const Loading = () => {
  const { isLoading } = useLoadingStore();
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-muted z-[9999] opacity-50">
      <LoaderIcon className="w-7 h-7 animate-spin text-primary" />
    </div>
  );
};
