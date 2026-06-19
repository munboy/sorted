'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { lessons, TheoryBlock } from '@/data/curriculum';
import { tasks } from '@/data/tasks';
import { useProgress } from '@/components/Providers';
import CodeBlock from '@/components/CodeBlock';
import LessonQuiz from '@/components/LessonQuiz';
import { ArrowLeft, Clock, Award, BookOpen, Briefcase, CheckSquare, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const { progress, toggleTopicCompleted } = useProgress();
  const [activeTab, setActiveTab] = useState<'theory' | 'production' | 'interview'>('theory');

  // Find lesson data
  const lesson = lessons.find((l) => l.slug === slug);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Тема не найдена</h1>
        <Link href="/topics" className="mt-4 inline-block text-sm font-semibold text-violet-600">
          Вернуться к каталогу тем
        </Link>
      </div>
    );
  }

  const isCompleted = progress.completedTopics.includes(lesson.slug);
  const relatedTasks = tasks.filter((t) => lesson.tasks.includes(t.slug));

  // Find next recommended lesson (next in order)
  const nextLesson = lessons.find((l) => l.order === lesson.order + 1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <Link
          href="/topics"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Все темы / {lesson.sectionTitle}
        </Link>
      </nav>

      {/* Main Grid: Left sidebar (stats & links), Right (Main text area) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sticky Sidebar Panel (Lg: 3 columns) */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-900 dark:text-slate-50 text-sm border-b border-slate-100 dark:border-slate-850 pb-2">
              Информация о уроке
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Время изучения</span>
                <span className="font-semibold text-slate-800 dark:text-slate-250">{lesson.estimatedMinutes} мин</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-1.5"><Award className="h-4 w-4" /> Сложность</span>
                <span className={`font-semibold ${
                  lesson.difficulty === 'Легкий'
                    ? 'text-sky-600'
                    : lesson.difficulty === 'Средний'
                    ? 'text-amber-600'
                    : 'text-rose-600'
                }`}>{lesson.difficulty}</span>
              </div>
            </div>

            {/* Checklist anchor links */}
            <div className="border-t border-slate-100 dark:border-slate-850 pt-3">
              <div className="text-xs font-semibold text-slate-400 mb-2">Навигация по уроку</div>
              <div className="flex flex-col gap-1 text-xs">
                <button
                  onClick={() => setActiveTab('theory')}
                  className={`w-full text-left px-2 py-1.5 rounded transition ${
                    activeTab === 'theory'
                      ? 'bg-slate-100 dark:bg-slate-900 font-bold text-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  1. Теория и основы
                </button>
                <button
                  onClick={() => setActiveTab('production')}
                  className={`w-full text-left px-2 py-1.5 rounded transition ${
                    activeTab === 'production'
                      ? 'bg-slate-100 dark:bg-slate-900 font-bold text-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  2. Реальное производство
                </button>
                <button
                  onClick={() => setActiveTab('interview')}
                  className={`w-full text-left px-2 py-1.5 rounded transition ${
                    activeTab === 'interview'
                      ? 'bg-slate-100 dark:bg-slate-900 font-bold text-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  3. Подготовка к интервью
                </button>
              </div>
            </div>

            {/* Mark as Completed Button */}
            <div className="border-t border-slate-100 dark:border-slate-850 pt-4">
              <button
                onClick={() => toggleTopicCompleted(lesson.slug)}
                className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs border flex items-center justify-center gap-2 cursor-pointer transition ${
                  isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400'
                    : 'bg-violet-600 border-violet-600 hover:bg-violet-750 text-white shadow-sm'
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Изучено (Нажмите, чтобы сбросить)
                  </>
                ) : (
                  'Отметить как пройденное'
                )}
              </button>
            </div>
          </div>

          {/* Quick tasks list in sidebar if present */}
          {relatedTasks.length > 0 && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-50 text-xs border-b border-slate-100 dark:border-slate-850 pb-2 flex items-center gap-1.5">
                <CheckSquare className="h-4 w-4 text-violet-600" />
                Практические задачи
              </h3>
              <div className="space-y-2">
                {relatedTasks.map((task) => (
                  <Link
                    key={task.slug}
                    href={`/practice/${task.slug}`}
                    className="block p-2.5 rounded border border-slate-100 dark:border-slate-900 hover:border-violet-300 dark:hover:border-violet-900 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition"
                  >
                    <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {task.title}
                    </div>
                    <span className="inline-block text-[9px] font-mono mt-1 text-slate-400">
                      {task.difficulty}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Lesson Reading Panel (Lg: 9 columns) */}
        <section className="lg:col-span-9 space-y-8">
          
          {/* Header Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 p-6 shadow-sm">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              {lesson.title}
            </h1>
            <p className="mt-3 text-slate-500 text-sm leading-relaxed max-w-3xl">
              {lesson.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs border-t border-slate-100 dark:border-slate-850 pt-3 text-slate-400">
              <span className="font-semibold text-slate-600 dark:text-slate-350">Что нужно знать заранее:</span>{' '}
              {lesson.whatToKnowBefore}
            </div>
          </div>

          {/* Reading Tabs Switcher (Top of main content) */}
          <div className="flex border-b border-slate-200 dark:border-slate-850 text-sm font-medium">
            <button
              onClick={() => setActiveTab('theory')}
              className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 cursor-pointer transition ${
                activeTab === 'theory'
                  ? 'border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-350'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Теория и основы
            </button>
            <button
              onClick={() => setActiveTab('production')}
              className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 cursor-pointer transition ${
                activeTab === 'production'
                  ? 'border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-355'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Реальное производство
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 cursor-pointer transition ${
                activeTab === 'interview'
                  ? 'border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-355'
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              Подготовка к собеседованию
            </button>
          </div>

          {/* TAB 1: Theory */}
          {activeTab === 'theory' && (
            <article className="max-w-3xl space-y-6">
              {/* Key Terms */}
              <div className="rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/30 p-4 mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-xs mb-3 uppercase tracking-wider text-slate-500">
                  Ключевые термины
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lesson.keyTerms.map((term, i) => (
                    <div key={i} className="text-xs">
                      <dt className="font-bold text-slate-850 dark:text-slate-200">{term.term}</dt>
                      <dd className="mt-1 text-slate-500 leading-relaxed">{term.definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Theory Blocks */}
              <RenderTheoryBlocks blocks={lesson.theory} />

              {/* Step by Step */}
              {lesson.stepByStep.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-850">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-55 mb-4">
                    Пошаговый разбор и логика работы
                  </h2>
                  <RenderTheoryBlocks blocks={lesson.stepByStep} />
                </div>
              )}
            </article>
          )}

          {/* TAB 2: Production */}
          {activeTab === 'production' && (
            <article className="max-w-3xl space-y-8">
              {/* When to use comparison grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                  <h3 className="font-bold text-emerald-800 dark:text-emerald-450 text-sm mb-2 flex items-center gap-1">
                    <span className="text-lg">✓</span> Когда использовать:
                  </h3>
                  <p className="text-xs text-emerald-900/80 dark:text-emerald-400/90 leading-relaxed">
                    {lesson.whenToUse}
                  </p>
                </div>
                <div className="p-5 rounded-lg border border-rose-500/20 bg-rose-500/5">
                  <h3 className="font-bold text-rose-800 dark:text-rose-450 text-sm mb-2 flex items-center gap-1">
                    <span className="text-lg">✗</span> Когда НЕ использовать:
                  </h3>
                  <p className="text-xs text-rose-900/80 dark:text-rose-400/90 leading-relaxed">
                    {lesson.whenNotToUse}
                  </p>
                </div>
              </div>

              {/* Right / Wrong code blocks */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-50 flex items-center gap-2 mb-2">
                    <span className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs flex items-center justify-center font-bold">✓</span>
                    {lesson.rightExample.title}
                  </h3>
                  <CodeBlock code={lesson.rightExample.code} title="Правильный пример (Рекомендуется)" />
                  <p className="text-xs text-slate-500 leading-relaxed mt-2 bg-slate-50 dark:bg-slate-900/20 p-3 rounded">
                    {lesson.rightExample.explanation}
                  </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-850 pt-6">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-50 flex items-center gap-2 mb-2">
                    <span className="h-5 w-5 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-450 text-xs flex items-center justify-center font-bold">✗</span>
                    {lesson.wrongExample.title}
                  </h3>
                  <CodeBlock code={lesson.wrongExample.code} title="Неправильный пример (Антипаттерн)" />
                  <p className="text-xs text-rose-800/80 dark:text-rose-400/95 leading-relaxed mt-2 bg-rose-500/5 p-3 rounded border border-rose-500/10">
                    {lesson.wrongExample.explanation}
                  </p>
                </div>
              </div>

              {/* Common Beginner Mistakes */}
              <div className="border-t border-slate-100 dark:border-slate-850 pt-6">
                <h3 className="font-bold text-slate-900 dark:text-slate-50 text-base mb-3">
                  Частые ошибки разработчиков
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  {lesson.commonMistakes.map((mistake, i) => (
                    <li key={i}>{mistake}</li>
                  ))}
                </ul>
              </div>
            </article>
          )}

          {/* TAB 3: Interview */}
          {activeTab === 'interview' && (
            <article className="max-w-3xl space-y-8">
              {/* Checklist */}
              <div className="rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/30 p-5">
                <h3 className="font-bold text-slate-900 dark:text-slate-55 text-xs mb-3 uppercase tracking-wider text-slate-500">
                  Мини-чеклист: Что вы должны уметь делать после темы
                </h3>
                <ul className="space-y-2">
                  {lesson.checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-350">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detailed Interview Simulator Q&As */}
              <div className="space-y-8">
                {lesson.interviewQA.map((qa, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400 text-xs font-bold font-mono">
                        Q
                      </span>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                        {qa.question}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-900/40 p-4 rounded-lg">
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Что проверяет интервьюер:</span>
                        <p className="text-slate-500 leading-relaxed">{qa.interviewerExpectation}</p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Что упомянуть в первую очередь:</span>
                        <p className="text-slate-500 leading-relaxed">{qa.firstMention}</p>
                      </div>
                    </div>

                    <div className="text-xs space-y-2">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-300 block">Структура устного ответа:</span>
                        <p className="text-slate-500 leading-relaxed mt-0.5">{qa.verbalStructure}</p>
                      </div>
                      <div>
                        <span className="font-bold text-rose-800 dark:text-rose-400 block">Типичные ошибки при ответе:</span>
                        <p className="text-slate-500 leading-relaxed mt-0.5">{qa.commonAnswerMistakes}</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-850 pt-4 space-y-2">
                      <span className="font-bold text-xs text-slate-850 dark:text-slate-250 block">Рекомендуемый сильный ответ:</span>
                      <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-350 bg-slate-50 dark:bg-slate-900/20 p-4 rounded border border-slate-150 dark:border-slate-850">
                        {qa.strongAnswer}
                      </div>
                    </div>

                    {qa.followUpQuestions.length > 0 && (
                      <div className="border-t border-slate-100 dark:border-slate-850 pt-3">
                        <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">
                          Возможные дополнительные вопросы:
                        </span>
                        <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500">
                          {qa.followUpQuestions.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Interactive Quiz & Exercises Footer */}
          <div className="border-t border-slate-200 dark:border-slate-850 pt-8 mt-12 space-y-8">
            <LessonQuiz topicSlug={lesson.slug} quizzes={lesson.quizzes} />

            {/* Next Lesson CTA */}
            {nextLesson && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Следующая рекомендуемая тема</span>
                  <h4 className="font-bold text-slate-900 dark:text-slate-50 text-base mt-1">{nextLesson.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{nextLesson.summary}</p>
                </div>
                <Link
                  href={`/topics/${nextLesson.slug}`}
                  onClick={() => setActiveTab('theory')}
                  className="rounded-lg bg-slate-900 dark:bg-slate-850 hover:bg-slate-850 dark:hover:bg-slate-800 px-5 py-2.5 text-xs font-semibold text-white shadow-sm flex items-center justify-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
                >
                  Перейти
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>

        </section>
      </div>
    </div>
  );
}

function RenderTheoryBlocks({ blocks }: { blocks: TheoryBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={idx} className="text-base leading-relaxed text-slate-700 dark:text-slate-350">
                {block.content as string}
              </p>
            );
          case 'heading':
            const level = block.level || 2;
            if (level === 2) {
              return (
                <h2
                  key={idx}
                  className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mt-8 mb-4 border-b border-slate-100 dark:border-slate-850 pb-2"
                >
                  {block.content as string}
                </h2>
              );
            }
            return (
              <h3 key={idx} className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-55 mt-6 mb-3">
                {block.content as string}
              </h3>
            );
          case 'code':
            return (
              <CodeBlock
                key={idx}
                code={block.content as string}
                language={block.language || 'javascript'}
              />
            );
          case 'list':
            return (
              <ul key={idx} className="list-decimal pl-6 space-y-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400 my-4">
                {(block.content as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case 'alert':
            const alertBg =
              block.alertType === 'warning'
                ? 'bg-amber-500/5 border-amber-500/10 text-amber-800 dark:text-amber-400'
                : block.alertType === 'error'
                ? 'bg-rose-500/5 border-rose-500/10 text-rose-850 dark:text-rose-400'
                : 'bg-violet-500/5 border-violet-500/10 text-violet-850 dark:text-violet-400';
            return (
              <div key={idx} className={`p-4 rounded-lg border my-6 text-xs leading-relaxed ${alertBg}`}>
                {block.content as string}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
