import React from 'react';
import Link from 'next/link';
import ProgressBar from '@/components/ProgressBar';
import { ArrowRight, BookOpen, Layers, Award, ShieldAlert, Check } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative isolate overflow-hidden bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-55 sm:text-6xl leading-[1.15]">
            Освойте основы массивов и алгоритмы сортировки на{' '}
            <span className="text-violet-600 dark:text-violet-400">профессиональном</span> уровне
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Хватит заучивать шаблонные ответы. Изучите структуры данных, разберитесь с компараторами и
            иммутабельностью в JavaScript, а затем перейдите к глубокой реализации классических алгоритмов и
            лучшим практикам написания надежного продакшен-кода.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/topics"
              className="rounded-lg bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition flex items-center gap-2 group cursor-pointer"
            >
              Начать обучение
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/roadmap"
              className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-350 hover:text-violet-600 dark:hover:text-violet-450 transition"
            >
              Посмотреть карту обучения <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Widget */}
        <div className="mx-auto mt-16 max-w-md">
          <ProgressBar />
        </div>

        {/* Learning Modules Path */}
        <div className="mx-auto mt-24 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Программа подготовки
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Четыре последовательных модуля, закрывающих все пробелы перед техническим собеседованием.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 mb-4">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  1. База и методы массивов
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Индексация, безопасная итерация, функциональные методы преобразования данных (map, filter, reduce), мутации и современные стандарты ES2023 (toSorted). Основы сложности алгоритмов Big O.
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-850 pt-4">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-violet-600" /> Обход массивов без выхода за границы</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-violet-600" /> Иммутабельность в React компонентах</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 mb-4">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  2. Встроенный sort() и компараторы
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Разбор лексикографического поведения JS по умолчанию. Написание кастомных компараторов для сортировки чисел, сложных объектов по нескольким ключам и строк с учетом русской локали.
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-850 pt-4">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-violet-600" /> Сравнение строк через localeCompare</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-violet-600" /> Сортировка по нескольким критериям</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 mb-4">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  3. Алгоритмы для собеседований
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Пошаговая реализация Bubble, Selection, Insertion, Quick, Merge и Heap sort. Оценка временной и пространственной сложности, стабильность алгоритмов и TDD практика на локальных тестах.
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-850 pt-4">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-violet-600" /> In-place разделение и рекурсия</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-violet-600" /> Разбор гибридной Timsort</li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 mb-4">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  4. Продакшен и устойчивый код
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Правила безопасной сортировки грязных данных, обработка null и undefined без TypeError. Оптимизация рендеринга таблиц, перенос сортировки на уровень СУБД/бэкенда и защита от утечек памяти.
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-850 pt-4">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-violet-600" /> Защита от TypeError на пустых полях</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-violet-600" /> Интеграция сортировок в React-таблицы</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
