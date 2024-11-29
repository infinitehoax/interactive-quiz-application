import React, { useState } from 'react';
import { JsonInput } from './components/JsonInput';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizProgress } from './components/QuizProgress';
import { QuizResults } from './components/QuizResults';
import { QuizState, QuizQuestion as QuizQuestionType } from './types/quiz';

export function App() {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    showResults: false,
    answers: [],
    isJsonInputMode: true,
    selectedAnswer: null,
    showFeedback: false,
  });

  const handleQuizStart = (questions: QuizQuestionType[]) => {
    setState({
      ...state,
      questions,
      isJsonInputMode: false,
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
      answers: [],
      selectedAnswer: null,
      showFeedback: false,
    });
  };

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === state.questions[state.currentQuestionIndex].correct;
    setState({
      ...state,
      selectedAnswer: answer,
      score: isCorrect ? state.score + 1 : state.score,
      showFeedback: true,
    });
  };

  const handleNext = () => {
    const newAnswers = [...state.answers, state.selectedAnswer];
    
    if (state.currentQuestionIndex === state.questions.length - 1) {
      setState({
        ...state,
        answers: newAnswers,
        showResults: true,
        selectedAnswer: null,
        showFeedback: false,
      });
    } else {
      setState({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answers: newAnswers,
        selectedAnswer: null,
        showFeedback: false,
      });
    }
  };

  const handleRestart = () => {
    setState({
      ...state,
      isJsonInputMode: true,
      currentQuestionIndex: 0,
      score: 0,
      showResults: false,
      answers: [],
      selectedAnswer: null,
      showFeedback: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {state.isJsonInputMode ? (
          <JsonInput onSubmit={handleQuizStart} />
        ) : state.showResults ? (
          <QuizResults
            score={state.score}
            totalQuestions={state.questions.length}
            onRestart={handleRestart}
          />
        ) : (
          <>
            <QuizProgress
              currentQuestion={state.currentQuestionIndex}
              totalQuestions={state.questions.length}
              score={state.score}
            />
            <QuizQuestion
              question={state.questions[state.currentQuestionIndex]}
              selectedAnswer={state.selectedAnswer}
              onSelectAnswer={handleAnswer}
              onNext={handleNext}
              showFeedback={state.showFeedback}
            />
          </>
        )}
      </div>
    </div>
  );
}