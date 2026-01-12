"use client";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const x = e.clientX;
    const y = e.clientY;

    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.setAttribute("data-theme-transition", "true");

    if (!document.startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      root.removeAttribute("data-theme-transition");
      return;
    }

    document
      .startViewTransition(() => {
        setTheme(theme === "dark" ? "light" : "dark");
      })
      .finished.finally(() => {
        root.removeAttribute("data-theme-transition");
      });
  };

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? (
        <FiSun size={20} color="#A35C00" />
      ) : (
        <FiMoon size={20} color="#1F69FF" />
      )}
    </button>
  );
}
