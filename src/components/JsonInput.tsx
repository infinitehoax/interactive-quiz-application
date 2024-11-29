import React, { useState } from 'react';
import { FileText, Play } from 'lucide-react';
import { QuizQuestion } from '../types/quiz';

interface JsonInputProps {
  onSubmit: (questions: QuizQuestion[]) => void;
}

export function JsonInput({ onSubmit }: JsonInputProps) {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    try {
      const questions = JSON.parse(jsonInput);
      if (!Array.isArray(questions)) throw new Error('Input must be an array');
      if (!questions.every(q => 
        q.title && 
        Array.isArray(q.options) && 
        q.correct && 
        q.feedback
      )) {
        throw new Error('Invalid question format');
      }
      onSubmit(questions);
      setError('');
    } catch (e) {
      setError('Invalid JSON format. Please check your input.');
    }
  };

  const exampleJson = `[
  {
    "title": "What is the value of $\\pi$ to 2 decimal places?",
    "options": [
      "A) $3.12$",
      "B) $3.14$",
      "C) $3.16$",
      "D) $3.18$"
    ],
    "correct": "B) $3.14$",
    "feedback": "The value of $\\pi$ is approximately $3.14159...$, which rounds to $3.14$."
  }
]`;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Quiz JSON Input</h2>
            <p className="text-gray-600">Paste your quiz questions in JSON format. Supports LaTeX with $ symbols.</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <textarea
              className="w-full h-80 p-4 text-gray-800 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder={exampleJson}
              style={{ fontFamily: 'monospace' }}
            />
            <p className="text-sm text-gray-500">
              Tip: Use $...$ for inline LaTeX equations
            </p>
          </div>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
          >
            <Play className="w-5 h-5" />
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}