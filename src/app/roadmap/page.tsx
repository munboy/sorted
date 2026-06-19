'use client';

import React from 'react';
import Link from 'next/link';
import { lessons } from '@/data/curriculum';
import { useProgress } from '@/components/Providers';
import { CheckCircle2, Lock, Play, ArrowRight } from 'lucide-react';

export default function RoadmapPage() {
  const { progress } = useProgress();

  // Sort lessons by order
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  // Compute states for all lessons
  const roadmapItems = sortedLessons.map((lesson) => {
    const isCompleted = progress.completedTopics.includes(lesson.slug);
    const isLocked = false;
    const isAvailable = !isCompleted && !isLocked;

    return {
      ...lesson,
      isCompleted,
      isLocked,
      isAvailable,
    };
  });

  // Find the next recommended lesson (the first one that is available)
  const nextRecommended = roadmapItems.find((item) => item.isAvailable) || 
                          roadmapItems.find((item) => !item.isCompleted);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-850 pb-6 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Карта обучения
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Последовательный путь освоения алгоритмов от базовой итерации до практической работы в продакшене.
        </p>
      </div>

      {/* Recommended Next Lesson Box */}
      {nextRecommended && (
        <div className="rounded-xl border border-violet-500/20 dark:border-violet-400/20 bg-violet-500/5 p-6 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-block text-[10px] font-bold font-mono text-violet-600 dark:text-violet-450 uppercase tracking-wider">
              Рекомендуемый следующий шаг
            </span>
            <h3 className="font-bold text-slate-900 dark:text-slate-50 text-lg">
              {nextRecommended.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-1">
              {nextRecommended.summary}
            </p>
          </div>
          <Link
            href={`/topics/${nextRecommended.slug}`}
            className="px-5 py-3 rounded-lg bg-violet-600 dark:bg-violet-500 text-white font-semibold text-xs shadow-sm hover:bg-violet-750 transition flex items-center justify-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Продолжить обучение
          </Link>
        </div>
      )}

      {/* Vertical Roadmap Timeline */}
      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-12">
        {roadmapItems.map((item, idx) => {
          let statusBadge = (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
              <Lock className="h-3 w-3" />
              Заблокировано
            </span>
          );
          let markerColor = 'bg-slate-100 border-slate-200 dark:bg-slate-900 dark:border-slate-800';
          let markerIcon = <Lock className="h-3.5 w-3.5 text-slate-400" />;

          if (item.isCompleted) {
            statusBadge = (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-450">
                <CheckCircle2 className="h-3 w-3" />
                Пройдено
              </span>
            );
            markerColor = 'bg-emerald-50 border-emerald-500 dark:bg-emerald-950/20 dark:border-emerald-500';
            markerIcon = <CheckCircle2 className="h-4 w-4 text-emerald-650 dark:text-emerald-400" />;
          } else if (item.isAvailable) {
            statusBadge = (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-violet-600 dark:text-violet-400">
                <Play className="h-3 w-3 fill-current" />
                Доступно для изучения
              </span>
            );
            markerColor = 'bg-violet-50 border-violet-500 dark:bg-violet-950/20 dark:border-violet-400';
            markerIcon = <Play className="h-3 w-3 text-violet-650 dark:text-violet-450 fill-current" />;
          }

          return (
            <div key={item.slug} className="relative pl-8 md:pl-10">
              {/* Vertical timeline connector bullet */}
              <div
                className={`absolute -left-3.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 transition ${markerColor}`}
              >
                {markerIcon}
              </div>

              {/* Node Card */}
              <div
                className={`rounded-xl border p-5 bg-white dark:bg-slate-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  item.isCompleted
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : item.isAvailable
                    ? 'border-violet-500/20 hover:border-violet-400 bg-white dark:bg-slate-900/60 shadow-sm'
                    : 'border-slate-100 dark:border-slate-900 opacity-60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      Тема #{idx + 1}
                    </span>
                    <span>•</span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {item.sectionTitle}
                    </span>
                    <span>•</span>
                    {statusBadge}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-150 text-base">
                    {item.isLocked ? (
                      <span className="text-slate-400 cursor-not-allowed select-none">{item.title}</span>
                    ) : (
                      <Link
                        href={`/topics/${item.slug}`}
                        className="hover:text-violet-600 dark:hover:text-violet-400 transition"
                      >
                        {item.title}
                      </Link>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                    {item.summary}
                  </p>
                </div>

                {!item.isLocked && (
                  <Link
                    href={`/topics/${item.slug}`}
                    className={`px-4 py-2 rounded-lg border text-xs font-semibold text-center flex items-center justify-center gap-1 transition shrink-0 cursor-pointer ${
                      item.isCompleted
                        ? 'border-emerald-250 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50/20'
                        : 'bg-slate-900 dark:bg-slate-850 border-slate-900 dark:border-slate-800 text-white shadow-sm hover:bg-slate-850 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Перейти</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
