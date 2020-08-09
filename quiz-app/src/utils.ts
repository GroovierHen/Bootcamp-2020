export const shuffleArray = (array: string[]): Array<string> =>
  [...array].sort(() => Math.random() - 0.5);
