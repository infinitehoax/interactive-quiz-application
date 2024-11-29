import React from 'react';
import { Trophy } from 'lucide-react';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export function QuizProgress({ currentQuestion, totalQuestions, score }: QuizProgressProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-700">
            Question {currentQuestion + 1}/{totalQuestions}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span className="text-lg font-semibold text-yellow-700">Score: {score}</span>
        </div>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}