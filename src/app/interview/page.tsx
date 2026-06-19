'use client';

import React, { useState } from 'react';
import { lessons, InterviewQA } from '@/data/curriculum';
import { Layers, Eye, EyeOff, Search } from 'lucide-react';

interface GroupedQA {
  sectionTitle: string;
  questions: {
    lessonTitle: string;
    qa: InterviewQA;
  }[];
}

export default function InterviewPage() {
  const [search, setSearch] = useState('');
  const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({});

  // Group all questions by curriculum sections
  const groupedSections: Record<string, GroupedQA> = {};

  lessons.forEach((lesson) => {
    if (!lesson.interviewQA || lesson.interviewQA.length === 0) return;

    if (!groupedSections[lesson.section]) {
      groupedSections[lesson.section] = {
        sectionTitle: lesson.sectionTitle,
        questions: [],
      };
    }

    lesson.interviewQA.forEach((qa) => {
      groupedSections[lesson.section].questions.push({
        lessonTitle: lesson.title,
        qa,
      });
    });
  });

  const toggleAnswer = (key: string) => {
    setVisibleAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionsList = Object.values(groupedSections);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-850 pb-6 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Подготовка к техническим интервью
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          База сложных вопросов с правильным структурированием устных ответов и разбором ловушек интервьюеров.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Поиск по вопросам..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-violet-600 dark:focus:border-violet-500 outline-none transition"
        />
      </div>

      {/* Sections and Cards */}
      <div className="space-y-10">
        {sectionsList.map((section, secIdx) => {
          // Filter questions in this section by search query
          const filteredQuestions = section.questions.filter(
            (item) =>
              item.qa.question.toLowerCase().includes(search.toLowerCase()) ||
              item.qa.strongAnswer.toLowerCase().includes(search.toLowerCase())
          );

          if (filteredQuestions.length === 0) return null;

          return (
            <div key={secIdx} className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-850 pb-2">
                <Layers className="h-4 w-4 text-violet-600" />
                {section.sectionTitle}
              </h2>

              <div className="space-y-4">
                {filteredQuestions.map((item, qIdx) => {
                  const key = `${secIdx}-${qIdx}`;
                  const isVisible = visibleAnswers[key];
                  const { qa } = item;

                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-4"
                    >
                      {/* Top Info */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <span className="inline-block text-[10px] text-slate-400 font-mono">
                            Тема: {item.lessonTitle}
                          </span>
                          <h3 className="font-bold text-slate-900 dark:text-slate-50 text-base leading-snug">
                            {qa.question}
                          </h3>
                        </div>

                        <button
                          onClick={() => toggleAnswer(key)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 transition flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-350 shrink-0"
                        >
                          {isVisible ? (
                            <>
                              <EyeOff className="h-3.5 w-3.5" />
                              <span>Скрыть ответ</span>
                            </>
                          ) : (
                            <>
                              <Eye className="h-3.5 w-3.5" />
                              <span>Показать ответ</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Collapsible Answer Detail Section */}
                      {isVisible && (
                        <div className="space-y-4 border-t border-slate-100 dark:border-slate-850 pt-4 animate-fadeIn">
                          {/* Evaluated by interviewer */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-lg text-xs leading-relaxed">
                            <div>
                              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Что проверяет интервьюер:
                              </span>
                              <p className="text-slate-500">{qa.interviewerExpectation}</p>
                            </div>
                            <div>
                              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Что упомянуть первым делом:
                              </span>
                              <p className="text-slate-500">{qa.firstMention}</p>
                            </div>
                          </div>

                          {/* Verbal structure & mistakes */}
                          <div className="text-xs space-y-2">
                            <div>
                              <span className="font-bold text-slate-800 dark:text-slate-300 block">
                                Рекомендуемая структура устного ответа:
                              </span>
                              <p className="text-slate-500 mt-0.5">{qa.verbalStructure}</p>
                            </div>
                            <div>
                              <span className="font-bold text-rose-800 dark:text-rose-400 block">
                                Критические ошибки при ответе (Ловушки):
                              </span>
                              <p className="text-slate-500 mt-0.5">{qa.commonAnswerMistakes}</p>
                            </div>
                          </div>

                          {/* Strong sample answer */}
                          <div className="space-y-2">
                            <span className="font-bold text-xs text-slate-850 dark:text-slate-250 block">
                              Образцовый сильный ответ:
                            </span>
                            <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-350 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200/50 dark:border-slate-800/40">
                              {qa.strongAnswer}
                            </div>
                          </div>

                          {/* Follow ups */}
                          {qa.followUpQuestions.length > 0 && (
                            <div className="border-t border-slate-100 dark:border-slate-850 pt-3">
                              <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">
                                Ожидаемые уточняющие вопросы:
                              </span>
                              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500">
                                {qa.followUpQuestions.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
