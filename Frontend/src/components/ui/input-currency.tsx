"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { helper } from "@/helper";
import { cn } from "@/lib/utils";

interface InputCurrencyProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: number;
  onValueChange: (value: number) => void;
  locale?: string;
  fractionDigits?: number;
  min?: number;
  max?: number;
}

export const InputCurrency = React.forwardRef<HTMLInputElement, InputCurrencyProps>(
  ({ value = 0, onValueChange, locale = "ko-KR", fractionDigits = 0, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const format = React.useCallback(
      (v: number) => helper.formatNumber(v, locale, fractionDigits),
      [locale, fractionDigits]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const caret = input.selectionStart ?? 0;

      const raw = input.value.replace(/[^\d]/g, "");
      const rawCaret = input.value.slice(0, caret).replace(/[^\d]/g, "").length;

      const nextValue = Number(raw || 0);
      onValueChange(nextValue);

      const formatted = format(nextValue);

      requestAnimationFrame(() => {
        if (!inputRef.current) return;
        const nextCaret = helper.mapCaretRawToFormatted(raw, formatted, rawCaret);
        inputRef.current.setSelectionRange(nextCaret, nextCaret);
      });
    };

    return (
      <Input
        ref={(el) => {
          inputRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as any).current = el;
        }}
        className={cn("", props.className)}
        value={format(value)}
        onChange={handleChange}
        inputMode="numeric"
        {...props}
      />
    );
  }
);

InputCurrency.displayName = "InputCurrency";
