import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import type { Theme } from "@/types";
import { PopoverClose } from "@radix-ui/react-popover";
import { SunIcon } from "lucide-react";

const THEME: Theme[] = ["system", "light", "dark"];

export default function ThemeButton() {
  const onChangeTheme = (theme: Theme) => {
    const htmlTag = document.documentElement;
    htmlTag.classList.remove("dark", "light");
    if (theme === "system") {
      const isDarkTheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      htmlTag.classList.add(isDarkTheme ? "dark" : "light");
    } else {
      htmlTag.classList.add(theme);
    }
  };

  return (
    <div className="hover:bg-muted cursor-pointer rounded-full p-2">
      <Popover>
        <PopoverTrigger>
          <SunIcon />
        </PopoverTrigger>
        <PopoverContent className="w-35 p-0">
          {THEME.map((theme) => (
            <PopoverClose key={`theme-button-${theme}`} asChild>
              <div
                className="hover:bg-muted cursor-pointer p-3"
                onClick={() => onChangeTheme(theme)}
              >
                {theme}
              </div>
            </PopoverClose>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
