import { cn } from "@/lib/utils";
import { Button } from "./button";
import * as React from "react";
import { CheckIcon, Copy } from "lucide-react";

interface CopyButtonProps {
  className: string;
  variant: "ghost" | "default" | "link" | "destructive" | "outline" | "secondary" | null | undefined;
  value: string;
}

async function copyToClipboardWithMeta(value: string) {
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    console.error("Failed to copy text: ", error);
  }
}

export function CopyButton({ value, className, variant = "ghost", ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant={variant}
      type="button"
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        copyToClipboardWithMeta(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <Copy />}
    </Button>
  );
}
