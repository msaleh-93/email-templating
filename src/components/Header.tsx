import { memo } from "react";

import { useTheme } from "~/stores/theme";

export default function Header() {
  return (
    <header className="w-full h-16 px-8 bg-indigo-700 text-white flex items-center justify-between sticky top-0 z-20">
      <div className="flex gap-5 items-center">
        <img src="/fly-akeed-logo.svg" alt="FlyAkeed Logo" className="h-10" />

        <h1 className="text-2xl font-bold" dir="auto">
          Fly Akeed - Email Templates
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
}

const ThemeToggle = memo(() => {
  const setUserTheme = useTheme((s) => s.setUserTheme);

  return (
    <button
      className="size-9 border-2 border-white rounded-md font-bold flex items-center justify-center"
      onClick={() => setUserTheme("next")}
    >
      <span className="not-system:hidden pb-1">💻️</span>
      <span className="system:hidden not-dark:hidden">🌒</span>
      <span className="system:hidden dark:hidden">☀️</span>
    </button>
  );
});
