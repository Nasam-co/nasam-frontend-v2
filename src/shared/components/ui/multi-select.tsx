import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { useLanguage } from "@/shared/hooks/useLanguage";
import { useTranslation } from "react-i18next";

interface MultiSelectProps {
  options: Array<{ value: string; label: string }>;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  value = [],
  onValueChange,
  placeholder = "Select options...",
  className,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      onValueChange?.(value.filter((v) => v !== selectedValue));
    } else {
      onValueChange?.([...value, selectedValue]);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-9",
          open && "ring-2 ring-ring/50",
          isRTL ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div className={cn("flex items-center gap-1 flex-wrap flex-1 min-w-0")}>
          {value.length > 0 ? (
            value.length === 1 ? (
              <span className="truncate">
                {options.find((opt) => opt.value === value[0])?.label ||
                  value[0]}
              </span>
            ) : (
              <span className="text-sm">
                {value.length} {t("common.selected", "selected")}
              </span>
            )
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDownIcon
          className={cn(
            "size-4 opacity-50 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-full z-50 mt-1 bg-popover text-popover-foreground border rounded-md shadow-md max-h-60 overflow-auto",
            isRTL ? "right-0 left-0" : "left-0 right-0"
          )}
        >
          <div className="p-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "focus:text-accent-foreground relative flex justify-between w-full cursor-default items-center gap-2 rounded-sm py-1.5 px-3 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground",
                  value.includes(option.value) && " text-accent-foreground",
                  isRTL ? "flex-row" : "flex-row-reverse"
                )}
              >
                <span className={cn(" flex size-3.5 ")}>
                  {value.includes(option.value) && (
                    <CheckIcon className="size-4" />
                  )}
                </span>
                <span className={cn("truncate")}>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
