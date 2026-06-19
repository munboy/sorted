'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/data/curriculum';
import { useProgress } from '@/components/Providers';
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

interface LessonQuizProps {
  topicSlug: string;
  quizzes: QuizQuestion[];
}

export default function LessonQuiz({ topicSlug, quizzes }: LessonQuizProps) {
  const { markQuizCompleted, progress } = useProgress();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [checkedQuizzes, setCheckedQuizzes] = useState<Record<string, boolean>>({});

  if (!quizzes || quizzes.length === 0) return null;

  const handleSelect = (quizId: string, optionIndex: number) => {
    if (checkedQuizzes[quizId]) return; // Already submitted
    setSelectedAnswers((prev) => ({ ...prev, [quizId]: optionIndex }));
  };

  const handleCheck = (quizId: string) => {
    if (selectedAnswers[quizId] === undefined) return;
    setCheckedQuizzes((prev) => ({ ...prev, [quizId]: true }));
    
    // Check if all quizzes for this topic are now completed
    const allChecked = quizzes.every(
      (q) => q.id === quizId ? true : checkedQuizzes[q.id]
    );
    if (allChecked) {
      markQuizCompleted(topicSlug);
    }
  };

  const isCompleted = progress.completedQuizzes.includes(topicSlug);

  return (
    <div className="my-8 p-6 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/50">
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-850 pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Самопроверка знаний (Мини-квиз)
          </h3>
        </div>
        {isCompleted && (
          <span className="text-xs px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-medium rounded-full border border-emerald-200 dark:border-emerald-900/40">
            Завершено
          </span>
        )}
      </div>

      <div className="space-y-6">
        {quizzes.map((quiz, index) => {
          const selectedOption = selectedAnswers[quiz.id];
          const isChecked = checkedQuizzes[quiz.id];
          const isCorrect = selectedOption === quiz.correctAnswerIndex;

          return (
            <div key={quiz.id} className="space-y-3">
              <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Вопрос {index + 1}: {quiz.question}
              </div>

              <div className="grid grid-cols-1 gap-2">
                {quiz.options.map((option, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrectOption = optIdx === quiz.correctAnswerIndex;

                  let optionClass = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300';
                  if (isSelected && !isChecked) {
                    optionClass = 'border-violet-600 dark:border-violet-400 bg-violet-50/30 dark:bg-violet-950/20 text-violet-900 dark:text-violet-300 font-medium';
                  } else if (isChecked) {
                    if (isCorrectOption) {
                      optionClass = 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-900 dark:text-emerald-305';
                    } else if (isSelected) {
                      optionClass = 'border-rose-600 dark:border-rose-500 bg-rose-50/20 dark:bg-rose-950/10 text-rose-900 dark:text-rose-300';
                    } else {
                      optionClass = 'border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20 text-slate-400 dark:text-slate-650 cursor-not-allowed';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(quiz.id, optIdx)}
                      disabled={isChecked}
                      className={`w-full text-left p-3.5 text-sm rounded-lg border transition duration-150 cursor-pointer ${optionClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {!isChecked && (
                <button
                  onClick={() => handleCheck(quiz.id)}
                  disabled={selectedOption === undefined}
                  className={`mt-2 px-4 py-2 text-xs font-semibold rounded-md transition duration-155 cursor-pointer ${
                    selectedOption !== undefined
                      ? 'bg-violet-600 dark:bg-violet-500 hover:bg-violet-750 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  }`}
                >
                  Проверить ответ
                </button>
              )}

              {isChecked && (
                <div className={`mt-3 p-4 rounded-lg text-xs leading-relaxed border ${
                  isCorrect
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400'
                    : 'bg-rose-50/40 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900/30 text-rose-800 dark:text-rose-400'
                }`}>
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Правильно!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                        <span>Неправильно</span>
                      </>
                    )}
                  </div>
                  <p>{quiz.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
