import { shuffleArray } from "./utils";

export interface Question {
  results: Result[];
}

export interface Result {
  category: string;
  type: Type;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
}

export enum Difficulty {
  EASY = "easy",
  HARD = "hard",
  MEDIUM = "medium",
}

export enum Type {
  MULTIPLE = "multiple",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<Result[]> => {
  const endPoint: string = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data: Question = await (await fetch(endPoint)).json();
  return data.results.map((question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
