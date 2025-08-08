import * as React from "react";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { useLanguage } from "@/shared/hooks/useLanguage";

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

  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      onValueChange?.(value.filter((v) => v !== selectedValue));
    } else {
      onValueChange?.([...value, selectedValue]);
    }
  };

  const handleRemove = (valueToRemove: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onValueChange?.(value.filter((v) => v !== valueToRemove));
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-9",
          open && "ring-2 ring-ring/50"
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="flex items-center gap-1 flex-wrap flex-1 min-w-0">
          {value.length > 0 ? (
            value.length === 1 ? (
              <span className="truncate">
                {options.find((opt) => opt.value === value[0])?.label ||
                  value[0]}
              </span>
            ) : (
              value.map((val) => {
                const option = options.find((opt) => opt.value === val);
                return (
                  <span
                    key={val}
                    className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                  >
                    <span className="truncate max-w-20">
                      {option?.label || val}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleRemove(val, e)}
                      className="hover:bg-secondary-foreground/20 rounded p-0.5"
                    >
                      <XIcon className="size-3" />
                    </button>
                  </span>
                );
              })
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
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover text-popover-foreground border rounded-md shadow-md max-h-60 overflow-auto"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="p-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "focus:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground",
                  value.includes(option.value) && " text-accent-foreground"
                )}
              >
                <span className="absolute right-2 flex size-3.5 items-center justify-center">
                  {value.includes(option.value) && (
                    <CheckIcon className="size-4" />
                  )}
                </span>
                <span className="truncate">{option.label}</span>
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
