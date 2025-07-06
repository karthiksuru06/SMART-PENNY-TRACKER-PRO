// src/components/ui/ThemeToggle.tsx
import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-border backdrop-blur-md bg-white/10 dark:bg-black/10 shadow-lg hover:scale-105 transition-all duration-300 text-yellow-400 dark:text-white"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 animate-pulse" />
      ) : (
        <Moon className="h-6 w-6 animate-pulse" />
      )}
    </button>
  );
};

export default ThemeToggle;
