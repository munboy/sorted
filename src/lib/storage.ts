export interface AppProgress {
  completedTopics: string[]; // Topic slugs
  completedQuizzes: string[]; // Topic slugs
  completedTasks: string[];   // Task slugs
}

class MemoryStorage {
  private data: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.data[key] || null;
  }

  setItem(key: string, value: string): void {
    this.data[key] = value;
  }

  removeItem(key: string): void {
    delete this.data[key];
  }
}

interface StorageInterface {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

let activeStorage: StorageInterface;

if (typeof window !== 'undefined') {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    activeStorage = window.localStorage;
  } catch {
    activeStorage = new MemoryStorage();
  }
} else {
  // SSR fallback
  activeStorage = new MemoryStorage();
}

const PROGRESS_KEY = 'edu_sorting_progress';
const THEME_KEY = 'edu_sorting_theme';

export function getProgress(): AppProgress {
  try {
    const val = activeStorage.getItem(PROGRESS_KEY);
    if (val) {
      const parsed = JSON.parse(val);
      return {
        completedTopics: Array.isArray(parsed.completedTopics) ? parsed.completedTopics : [],
        completedQuizzes: Array.isArray(parsed.completedQuizzes) ? parsed.completedQuizzes : [],
        completedTasks: Array.isArray(parsed.completedTasks) ? parsed.completedTasks : [],
      };
    }
  } catch (e) {
    console.error('Failed to parse progress storage', e);
  }
  return { completedTopics: [], completedQuizzes: [], completedTasks: [] };
}

export function saveProgress(progress: AppProgress): void {
  try {
    activeStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to storage', e);
  }
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const val = activeStorage.getItem(THEME_KEY);
    if (val === 'light' || val === 'dark') {
      return val;
    }
  } catch {}
  return 'light'; // Default theme
}

export function saveStoredTheme(theme: 'light' | 'dark'): void {
  try {
    activeStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to save theme to storage', e);
  }
}
