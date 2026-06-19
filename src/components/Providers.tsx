'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProgress, saveProgress, getStoredTheme, saveStoredTheme, AppProgress } from '@/lib/storage';

// --- THEME CONTEXT ---
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light'); // SSR safe default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    setTimeout(() => {
      setTheme(stored);
      setMounted(true);
    }, 0);
    
    // Apply class to html tag
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    saveStoredTheme(next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Prevent flash by avoiding UI mismatch before mounting
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={mounted ? '' : 'invisible'}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

// --- PROGRESS CONTEXT ---
interface ProgressContextType {
  progress: AppProgress;
  toggleTopicCompleted: (slug: string) => void;
  markQuizCompleted: (slug: string) => void;
  markTaskCompleted: (slug: string) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgressState] = useState<AppProgress>({
    completedTopics: [],
    completedQuizzes: [],
    completedTasks: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setProgressState(getProgress());
    }, 0);
  }, []);

  const updateProgress = (newProgress: AppProgress) => {
    setProgressState(newProgress);
    saveProgress(newProgress);
  };

  const toggleTopicCompleted = (slug: string) => {
    const current = { ...progress };
    if (current.completedTopics.includes(slug)) {
      current.completedTopics = current.completedTopics.filter((s) => s !== slug);
    } else {
      current.completedTopics = [...current.completedTopics, slug];
    }
    updateProgress(current);
  };

  const markQuizCompleted = (slug: string) => {
    if (progress.completedQuizzes.includes(slug)) return;
    const current = {
      ...progress,
      completedQuizzes: [...progress.completedQuizzes, slug],
    };
    updateProgress(current);
  };

  const markTaskCompleted = (slug: string) => {
    if (progress.completedTasks.includes(slug)) return;
    const current = {
      ...progress,
      completedTasks: [...progress.completedTasks, slug],
    };
    updateProgress(current);
  };

  const resetProgress = () => {
    updateProgress({
      completedTopics: [],
      completedQuizzes: [],
      completedTasks: [],
    });
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        toggleTopicCompleted,
        markQuizCompleted,
        markTaskCompleted,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
