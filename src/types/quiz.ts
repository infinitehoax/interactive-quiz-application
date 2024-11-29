export interface QuizQuestion {
  title: string;
  options: string[];
  correct: string;
  feedback: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  showResults: boolean;
  answers: (string | null)[];
  isJsonInputMode: boolean;
  selectedAnswer: string | null;
  showFeedback: boolean;
}