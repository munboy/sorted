'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { tasks } from '@/data/tasks';
import { useProgress } from '@/components/Providers';
import { Search, CheckCircle, Circle, Award, Code2 } from 'lucide-react';

export default function PracticeHubPage() {
  const { progress } = useProgress();
  const [search, setSearch] = useState('');
  const [activeDifficulty, setActiveDifficulty] = useState<'all' | 'Легкий' | 'Средний' | 'Сложный'>('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.statement.toLowerCase().includes(search.toLowerCase());

    const matchesDifficulty = activeDifficulty === 'all' || task.difficulty === activeDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-850 pb-6 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Практические задания
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Напишите решения для задач в редакторе кода и запустите тесты в терминале для проверки.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по задачам..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-violet-600 dark:focus:border-violet-500 outline-none transition"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex gap-1.5 p-1 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-100/50 dark:bg-slate-950/50">
          {[
            { id: 'all', label: 'Все' },
            { id: 'Легкий', label: 'Легкие' },
            { id: 'Средний', label: 'Средние' },
            { id: 'Сложный', label: 'Сложные' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveDifficulty(tab.id as 'all' | 'Легкий' | 'Средний' | 'Сложный')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeDifficulty === tab.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-800/50'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const isCompleted = progress.completedTasks.includes(task.slug);

            return (
              <div
                key={task.slug}
                className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all bg-white dark:bg-slate-900/40 ${
                  isCompleted
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : 'border-slate-200 dark:border-slate-850 hover:border-slate-350 dark:hover:border-slate-700 hover:shadow-sm'
                }`}
              >
                {/* Left info */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-1">
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300 dark:text-slate-750" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm hover:text-violet-600 dark:hover:text-violet-400 transition">
                      <Link href={`/practice/${task.slug}`}>
                        {task.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-2xl line-clamp-2">
                      {task.statement}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1 font-mono">
                      <span>Секция: {task.sectionTitle}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {task.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right button */}
                <Link
                  href={`/practice/${task.slug}`}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border text-center transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-250 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400'
                      : 'bg-slate-900 dark:bg-slate-850 border-slate-900 dark:border-slate-800 hover:bg-slate-850 dark:hover:bg-slate-800 text-white shadow-sm'
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  {isCompleted ? 'Решено снова' : 'Решать задачу'}
                </Link>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-850 rounded-xl">
            <p className="text-slate-500 text-sm">Задачи с выбранными фильтрами не найдены.</p>
          </div>
        )}
      </div>
    </div>
  );
}
