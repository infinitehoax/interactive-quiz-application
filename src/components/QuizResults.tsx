import React from 'react';
import { Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function QuizResults({ score, totalQuestions, onRestart }: QuizResultsProps) {
  React.useEffect(() => {
    if (score > totalQuestions / 2) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [score, totalQuestions]);

  const percentage = (score / totalQuestions) * 100;
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-14 h-14 text-yellow-500" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className="text-2xl text-gray-600 mb-8">
            You scored <span className="font-bold text-blue-600">{score}</span> out of {totalQuestions}
            <div className="text-3xl font-bold mt-2 text-blue-600">
              {percentage.toFixed(1)}%
            </div>
          </div>
          {percentage >= 70 ? (
            <p className="text-green-600 text-xl">Great job! You've mastered this topic! 🎉</p>
          ) : percentage >= 50 ? (
            <p className="text-blue-600 text-xl">Good effort! Keep practicing to improve! 💪</p>
          ) : (
            <p className="text-yellow-600 text-xl">You might want to review this topic again! 📚</p>
          )}
        </div>
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
}