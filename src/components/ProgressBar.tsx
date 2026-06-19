'use client';

import React from 'react';
import { useProgress } from '@/components/Providers';
import { lessons } from '@/data/curriculum';
import { tasks } from '@/data/tasks';

export default function ProgressBar() {
  const { progress } = useProgress();

  const totalTopics = lessons.length;
  const totalQuizzes = lessons.filter(l => l.quizzes && l.quizzes.length > 0).length;
  const totalTasks = tasks.length;

  const completedTopics = progress.completedTopics.length;
  const completedQuizzes = progress.completedQuizzes.length;
  const completedTasks = progress.completedTasks.length;

  // Calculate overall percentage
  const totalItems = totalTopics + totalQuizzes + totalTasks;
  const completedItems = completedTopics + completedQuizzes + completedTasks;
  const overallPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Ваш прогресс обучения
        </span>
        <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
          {overallPercentage}%
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden">
        <div
          className="h-full bg-violet-600 dark:bg-violet-500 transition-all duration-500"
          style={{ width: `${overallPercentage}%` }}
        />
      </div>

      {/* Breakdown stats */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-850 text-center text-[11px]">
        <div>
          <div className="font-bold text-slate-800 dark:text-slate-200">
            {completedTopics} / {totalTopics}
          </div>
          <div className="text-slate-400">Темы</div>
        </div>
        <div>
          <div className="font-bold text-slate-800 dark:text-slate-200">
            {completedQuizzes} / {totalQuizzes}
          </div>
          <div className="text-slate-400">Тесты</div>
        </div>
        <div>
          <div className="font-bold text-slate-800 dark:text-slate-200">
            {completedTasks} / {totalTasks}
          </div>
          <div className="text-slate-400">Задачи</div>
        </div>
      </div>
    </div>
  );
}
