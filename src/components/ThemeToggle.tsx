'use client';

import React from 'react';
import { useTheme } from '@/components/Providers';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition active:scale-95 cursor-pointer text-slate-700 dark:text-slate-350"
      title={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
      aria-label="Переключение темы оформления"
    >
      {theme === 'dark' ? (
        <Sun className="h-4.5 w-4.5 text-amber-500" />
      ) : (
        <Moon className="h-4.5 w-4.5 text-slate-700" />
      )}
    </button>
  );
}
