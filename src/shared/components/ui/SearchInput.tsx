import { Search } from "lucide-react";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/shared/utils/cn";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/** Input de busqueda con icono para toolbars de tablas. */
export const SearchInput = ({
  value,
  onChange,
  placeholder = "Buscar...",
  className,
}: SearchInputProps) => {
  const hintRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [scrollEnd, setScrollEnd] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const showHint = !value && !isFocused;

  useLayoutEffect(() => {
    const measure = () => {
      if (!hintRef.current || !textRef.current) {
        return;
      }

      const overflow =
        textRef.current.scrollWidth - hintRef.current.clientWidth;
      setScrollEnd(overflow > 4 ? -overflow : 0);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [placeholder, showHint]);

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <span
          className="pointer-events-none absolute inset-y-0 left-0 z-[15] w-9 bg-surface"
          aria-hidden
        />
        <Search className="pointer-events-none absolute left-3 top-1/2 z-20 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label={placeholder}
          title={placeholder}
          className="relative z-0 w-full border border-border bg-surface py-2 pl-9 pr-3 text-sm leading-normal text-foreground focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
        />
        {showHint && (
          <div
            ref={hintRef}
            className="pointer-events-none absolute inset-y-0 left-9 right-3 z-10 flex items-center overflow-hidden"
            aria-hidden
          >
            <span
              ref={textRef}
              className={cn(
                "whitespace-nowrap text-sm leading-normal text-muted/60",
                scrollEnd < 0 && "search-placeholder-marquee",
              )}
              style={
                scrollEnd < 0
                  ? ({ "--placeholder-scroll-end": `${scrollEnd}px` } as CSSProperties)
                  : undefined
              }
            >
              {placeholder}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
