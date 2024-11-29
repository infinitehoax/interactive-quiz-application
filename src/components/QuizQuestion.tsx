import React from 'react';
import { QuizQuestion as QuizQuestionType } from '../types/quiz';
import { Check, X, ArrowRight } from 'lucide-react';
import { processLatex } from '../utils/latex';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  showFeedback: boolean;
}

export function QuizQuestion({ 
  question, 
  selectedAnswer, 
  onSelectAnswer,
  onNext,
  showFeedback
}: QuizQuestionProps) {
  const isAnswered = selectedAnswer !== null;
  const correctAnswer = question.correct;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          {processLatex(question.title)}
        </h2>
        
        <div className="space-y-4">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === correctAnswer;
            
            let optionClasses = 
              'w-full p-6 text-lg rounded-xl transition-all duration-300 border-2 flex items-center justify-between ';
            
            if (!isAnswered) {
              optionClasses += 'hover:bg-blue-50 hover:border-blue-300 cursor-pointer bg-white border-gray-200';
            } else if (isCorrect) {
              optionClasses += 'bg-green-50 border-green-500 text-green-700';
            } else if (isSelected && !isCorrect) {
              optionClasses += 'bg-red-50 border-red-500 text-red-700';
            } else {
              optionClasses += 'bg-gray-50 border-gray-200 text-gray-500';
            }

            return (
              <button
                key={option}
                onClick={() => !isAnswered && onSelectAnswer(option)}
                className={optionClasses}
                disabled={isAnswered}
              >
                <div className="flex-1 text-left">{processLatex(option)}</div>
                {isAnswered && (isCorrect ? (
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-medium">Correct</span>
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                ) : isSelected ? (
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-medium">Incorrect</span>
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                ) : null)}
              </button>
            );
          })}
        </div>
      </div>
      
      {showFeedback && (
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className={`p-6 rounded-xl ${
            selectedAnswer === correctAnswer 
              ? 'bg-green-50 border-2 border-green-200 text-green-800' 
              : 'bg-red-50 border-2 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              {selectedAnswer === correctAnswer ? (
                <>
                  <Check className="w-6 h-6" />
                  <span className="font-semibold">Excellent!</span>
                </>
              ) : (
                <>
                  <X className="w-6 h-6" />
                  <span className="font-semibold">Not quite right</span>
                </>
              )}
            </div>
            <p className="text-lg">{processLatex(question.feedback)}</p>
          </div>
          
          <button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}