import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useSetTheme, useTheme } from "@/store/theme";
import type { Theme } from "@/types";
import { PopoverClose } from "@radix-ui/react-popover";
import { CheckIcon, SunIcon } from "lucide-react";

const THEME: Theme[] = ["system", "light", "dark"];

export default function ThemeButton() {
  const currentTheme = useTheme();
  const setTheme = useSetTheme();

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
                className="hover:bg-muted ursor-pointer flex items-center justify-between p-3"
                onClick={() => setTheme(theme)}
              >
                {theme}
                {currentTheme === theme && <CheckIcon className="h-4 w-4" />}
              </div>
            </PopoverClose>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
