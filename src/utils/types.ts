export interface Question {
  id: number;
  question: string;
  all_words: string[];
  good_words: string[];
}

export type GETQuestions = Question;

export type ReactSetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
