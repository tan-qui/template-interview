"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorProps) {
  const t = useTranslations();

  return (
    <div className="relative flex grow flex-col py-36">
      <div className="relative flex grow flex-col px-4 items-center justify-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t("Something went wrong")}</h2>
        <div className="flex flex-col items-center gap-6 mt-5 md:text-lg text-muted-foreground">
          <span>{t("Please try again or contact support if the problem persists")}</span>
          <Button className="ml-2" onClick={() => reset()}>
            {t("Try again")}
          </Button>
        </div>
      </div>
    </div>
  );
}
