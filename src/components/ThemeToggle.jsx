import { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode, MdMobileFriendly } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

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
    } else if (mode === "system") {
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
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );
  };

  return (
    <button
      onClick={cycleTheme}
      className="swap swap-rotate cursor-pointer flex items-center justify-center h-10 w-10"
    >
      {theme === "light" && <MdLightMode className="w-7 h-7" />}
      {theme === "dark" && <MdDarkMode className="w-7 h-7" />}
      {theme === "system" && <MdMobileFriendly className="w-7 h-7" />}
    </button>
  );
}

export default ThemeToggle; 