import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider, ProgressProvider } from '@/components/Providers';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { Code2, GitFork, Award, BookOpen, Layers } from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Сортировка.JS — Платформа для освоения алгоритмов сортировки',
  description: 'Интерактивная образовательная платформа для разработчиков по фундаментальным знаниям JavaScript, компараторам и классическим алгоритмам сортировки.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider>
          <ProgressProvider>
            {/* Header Navigation */}
            <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-850 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo */}
                  <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition select-none">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 dark:bg-violet-500 text-white shadow-sm shadow-violet-500/20">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-50">
                        Сортировка.JS
                      </span>
                      <span className="block text-[10px] text-slate-400 font-mono -mt-0.5">
                        developer_edu
                      </span>
                    </div>
                  </Link>

                  {/* Nav Links */}
                  <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-350">
                    <Link
                      href="/topics"
                      className="flex items-center gap-1.5 hover:text-violet-600 dark:hover:text-violet-400 transition"
                    >
                      <BookOpen className="h-4 w-4" />
                      Темы
                    </Link>
                    <Link
                      href="/roadmap"
                      className="flex items-center gap-1.5 hover:text-violet-600 dark:hover:text-violet-400 transition"
                    >
                      <GitFork className="h-4 w-4" />
                      Карта обучения
                    </Link>
                    <Link
                      href="/practice"
                      className="flex items-center gap-1.5 hover:text-violet-600 dark:hover:text-violet-400 transition"
                    >
                      <Award className="h-4 w-4" />
                      Практика
                    </Link>
                    <Link
                      href="/interview"
                      className="flex items-center gap-1.5 hover:text-violet-600 dark:hover:text-violet-400 transition"
                    >
                      <Layers className="h-4 w-4" />
                      Интервью
                    </Link>
                  </nav>

                  {/* Right side items */}
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </header>

            {/* Mobile Nav Bar (Bottom Navigation for quick accessibility on mobile) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 dark:border-slate-850 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md py-2">
              <nav className="flex justify-around items-center text-[10px] font-medium text-slate-500 dark:text-slate-400">
                <Link href="/topics" className="flex flex-col items-center gap-1 hover:text-violet-600 dark:hover:text-violet-400 transition">
                  <BookOpen className="h-5 w-5" />
                  <span>Темы</span>
                </Link>
                <Link href="/roadmap" className="flex flex-col items-center gap-1 hover:text-violet-600 dark:hover:text-violet-400 transition">
                  <GitFork className="h-5 w-5" />
                  <span>Карта</span>
                </Link>
                <Link href="/practice" className="flex flex-col items-center gap-1 hover:text-violet-600 dark:hover:text-violet-400 transition">
                  <Award className="h-5 w-5" />
                  <span>Практика</span>
                </Link>
                <Link href="/interview" className="flex flex-col items-center gap-1 hover:text-violet-600 dark:hover:text-violet-400 transition">
                  <Layers className="h-5 w-5" />
                  <span>Интервью</span>
                </Link>
              </nav>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 pb-16 md:pb-0">
              {children}
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 py-6 text-center text-xs text-slate-400">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p>© {new Date().getFullYear()} Сортировка.JS. Образовательный проект для фронтенд-инженеров.</p>
                <p className="mt-1 text-slate-500">
                  Разработано с целью качественной подготовки к техническим собеседованиям.
                </p>
              </div>
            </footer>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
