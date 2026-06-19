'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { tasks } from '@/data/tasks';
import { useProgress } from '@/components/Providers';
import { ArrowLeft, Award, Terminal, Lightbulb, AlertTriangle, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function PracticeTaskPage({ params }: { params: Promise<{ taskSlug: string }> }) {
  const { taskSlug } = React.use(params);
  const { progress, markTaskCompleted } = useProgress();
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});

  const task = tasks.find((t) => t.slug === taskSlug);

  if (!task) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Задача не найдена</h1>
        <Link href="/practice" className="mt-4 inline-block text-sm font-semibold text-violet-600">
          Вернуться к разделу практики
        </Link>
      </div>
    );
  }

  const isCompleted = progress.completedTasks.includes(task.slug);

  const toggleHint = (index: number) => {
    setRevealedHints((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Find related lesson slug
  const relatedLessonSlug = task.slug.replace('-task', '');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link
          href="/practice"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Все задачи / {task.sectionTitle}
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Task Description (Lg: 8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 mb-3 font-mono">
              <span className="uppercase tracking-wider">Секция: {task.sectionTitle}</span>
              <span className={`font-semibold flex items-center gap-1 ${
                task.difficulty === 'Легкий' ? 'text-sky-600' : task.difficulty === 'Средний' ? 'text-amber-600' : 'text-rose-600'
              }`}>
                <Award className="h-3.5 w-3.5" />
                {task.difficulty}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              {task.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-350 bg-slate-50 dark:bg-slate-900/10 p-4 rounded-lg border border-slate-100 dark:border-slate-850">
              {task.statement}
            </p>
          </div>

          {/* Expected Input/Output & Constraints */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                Ожидаемый ввод и вывод
              </h3>
              <pre className="font-mono text-xs text-slate-700 dark:text-slate-350 bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-lg border border-slate-100 dark:border-slate-900 overflow-x-auto whitespace-pre">
                {task.expectedInputOutput}
              </pre>
            </div>

            {task.constraints && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 p-5 shadow-sm space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  Ограничения
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 bg-rose-500/5 p-3.5 rounded-lg border border-rose-500/10">
                  {task.constraints}
                </p>
              </div>
            )}
          </div>

          {/* Hints Section */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-850 pb-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Подсказки к решению ({task.hints.length})
            </h3>
            <div className="space-y-2.5">
              {task.hints.map((hint, idx) => {
                const isRevealed = revealedHints[idx];

                return (
                  <div key={idx} className="border border-slate-100 dark:border-slate-900 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleHint(idx)}
                      className="w-full text-left bg-slate-50/50 dark:bg-slate-900/50 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 transition flex justify-between items-center cursor-pointer"
                    >
                      <span>Подсказка {idx + 1}</span>
                      <span className="text-[10px] text-violet-600 dark:text-violet-400">
                        {isRevealed ? 'Скрыть' : 'Показать'}
                      </span>
                    </button>
                    {isRevealed && (
                      <div className="p-4 text-xs leading-relaxed text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
                        {hint}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-850 pb-2">
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              Типичные ошибки новичков
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {task.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="leading-relaxed">{mistake}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Panel / Instructions Sidebar (Lg: 4 columns) */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-900 dark:text-slate-50 text-sm border-b border-slate-100 dark:border-slate-850 pb-2 flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-violet-600" />
              Как решить задачу?
            </h2>

            {/* Step instructions */}
            <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Шаг 1: Откройте файл шаблона</span>
                <p>Откройте файл в редакторе кода в корне проекта:</p>
                <div className="mt-1.5 p-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded font-mono text-[10px] select-all break-all">
                  {task.filePath}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Шаг 2: Реализуйте функцию</span>
                <p>Напишите ваше решение внутри экспортируемой функции. Вы можете создавать вспомогательные функции при необходимости.</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Шаг 3: Запустите автотесты</span>
                <p>Запустите команду тестирования в терминале для проверки вашего кода:</p>
                <div className="mt-1.5 p-2 bg-slate-900 text-slate-100 border border-slate-800 rounded font-mono text-[10px] select-all flex justify-between items-center gap-2">
                  <span className="break-all">{task.testCommand}</span>
                </div>
              </div>
            </div>

            {/* Quick Link to Theory */}
            <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
              <Link
                href={`/topics/${relatedLessonSlug}`}
                className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-350 cursor-pointer"
              >
                <span>Читать теорию темы</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Success validation toggle (Manual fallback toggle if tests passed) */}
            <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
              <button
                onClick={() => markTaskCompleted(task.slug)}
                className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs border flex items-center justify-center gap-2 transition cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400'
                    : 'bg-violet-600 border-violet-600 hover:bg-violet-750 text-white shadow-sm shadow-violet-500/10'
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Решено (Тесты пройдены)
                  </>
                ) : (
                  'Отметить как решенную'
                )}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
