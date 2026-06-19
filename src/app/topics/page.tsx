'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { lessons } from '@/data/curriculum';
import { useProgress } from '@/components/Providers';
import { Search, Clock, Award, CheckCircle2, Lock } from 'lucide-react';

export default function TopicsPage() {
  const { progress } = useProgress();
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState<'all' | 'fundamentals' | 'algorithms' | 'advanced' | 'production'>('all');

  const filtered = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(search.toLowerCase()) ||
      lesson.summary.toLowerCase().includes(search.toLowerCase());
    
    const matchesSection = activeSection === 'all' || lesson.section === activeSection;

    return matchesSearch && matchesSection;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-850 pb-6 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Учебная программа платформы
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Выберите тему, чтобы начать глубокое погружение с теорией, практикой и тестами.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-violet-600 dark:focus:border-violet-500 outline-none transition"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-100/50 dark:bg-slate-950/50">
          {[
            { id: 'all', label: 'Все темы' },
            { id: 'fundamentals', label: 'База' },
            { id: 'algorithms', label: 'Алгоритмы' },
            { id: 'advanced', label: 'Дополнительно' },
            { id: 'production', label: 'Продакшен' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as 'all' | 'fundamentals' | 'algorithms' | 'advanced' | 'production')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-800/50'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((lesson) => {
          const isCompleted = progress.completedTopics.includes(lesson.slug);
          const isLocked = false;


          // Find titles of prerequisites
          const prereqTitles = lesson.prerequisites
            .map((slug) => lessons.find((l) => l.slug === slug)?.title)
            .filter(Boolean);

          return (
            <div
              key={lesson.slug}
              className={`group flex flex-col justify-between rounded-xl border p-5 transition-all bg-white dark:bg-slate-900/40 ${
                isCompleted
                  ? 'border-emerald-500/30 shadow-sm shadow-emerald-500/5 dark:bg-emerald-950/5'
                  : isLocked
                  ? 'border-slate-200 dark:border-slate-900 opacity-60'
                  : 'border-slate-200 dark:border-slate-850 hover:border-slate-350 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div>
                {/* Topic Header Info */}
                <div className="flex items-center justify-between gap-2 text-xs mb-3 text-slate-400">
                  <span className="font-mono uppercase tracking-wider text-[10px]">
                    {lesson.sectionTitle}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold font-sans">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Готово
                      </span>
                    ) : isLocked ? (
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-500 font-semibold font-sans">
                        <Lock className="h-3.5 w-3.5" />
                        Закрыто
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 dark:text-slate-50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition mb-2">
                  <Link href={`/topics/${lesson.slug}`} className="focus:outline-none">
                    {lesson.title}
                  </Link>
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                  {lesson.summary}
                </p>
              </div>

              {/* Card Footer Info */}
              <div>
                {isLocked && prereqTitles.length > 0 && (
                  <div className="mb-4 text-[10px] text-amber-600 dark:text-amber-500 bg-amber-50/50 dark:bg-amber-950/20 p-2 rounded border border-amber-100 dark:border-amber-900/30">
                    <span className="font-semibold">Требуется изучить сначала:</span>{' '}
                    {prereqTitles.join(', ')}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-850 pt-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {lesson.estimatedMinutes} мин
                  </span>
                  <span className={`flex items-center gap-1 font-semibold ${
                    lesson.difficulty === 'Легкий'
                      ? 'text-sky-600 dark:text-sky-400'
                      : lesson.difficulty === 'Средний'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-rose-600 dark:text-rose-450'
                  }`}>
                    <Award className="h-3.5 w-3.5" />
                    {lesson.difficulty}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
