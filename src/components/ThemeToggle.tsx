import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(stored === "light" ? false : stored === "dark" ? true : prefersDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="relative w-10 h-6 rounded-full border border-zinc-700 dark:border-zinc-600 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="sr-only">{dark ? "Light mode" : "Dark mode"}</span>
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-accent transition-transform duration-300 ${
          dark ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}
