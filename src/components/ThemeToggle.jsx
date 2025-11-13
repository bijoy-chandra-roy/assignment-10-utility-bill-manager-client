import { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode, MdMobileFriendly } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("theme") || "system";
    return "system";
  });
  const [animating, setAnimating] = useState(false);

  const applyTheme = (mode) => {
    const root = document.documentElement;
    if (mode === "light") {
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    } else if (mode === "dark") {
      root.classList.add("dark");
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#f0f0f0";
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
        document.body.style.backgroundColor = "#121212";
        document.body.style.color = "#f0f0f0";
      } else {
        root.classList.remove("dark");
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#000000";
      }
    }
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, [theme]);

  const cycleTheme = () => {
    setAnimating(true);
    setTheme((prev) => (prev === "light" ? "dark" : prev === "dark" ? "system" : "light"));
    setTimeout(() => setAnimating(false), 420);
  };

  const base = "absolute inset-0 flex items-center justify-center transition-transform duration-400 ease-in-out";
  const visible = "opacity-100 scale-100 rotate-0 z-20";
  const hidden = "opacity-0 scale-75 -rotate-90 z-10 pointer-events-none";

  return (
    <button
      onClick={cycleTheme}
      aria-label="Toggle theme"
      className={`relative inline-flex items-center justify-center h-10 w-10 swap swap-rotate`}
    >
      <span className={`${base} ${theme === "light" && !animating ? visible : theme === "light" && animating ? visible : hidden}`}>
        <MdLightMode className="w-7 h-7" />
      </span>

      <span className={`${base} ${theme === "dark" && !animating ? visible : theme === "dark" && animating ? visible : hidden}`}>
        <MdDarkMode className="w-7 h-7" />
      </span>

      <span className={`${base} ${theme === "system" && !animating ? visible : theme === "system" && animating ? visible : hidden}`}>
        <MdMobileFriendly className="w-7 h-7" />
      </span>
    </button>
  );
};

export default ThemeToggle;
