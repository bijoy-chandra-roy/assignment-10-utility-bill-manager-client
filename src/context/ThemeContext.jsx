import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: "system",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState("system");

  const applyTheme = (value) => {
    if (value === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      document.documentElement.setAttribute("data-theme", value);
    }
  };

  const setTheme = (value) => {
    setThemeState(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "system";
    setThemeState(saved);
    applyTheme(saved);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => {
      mq.removeEventListener("change", handler);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};