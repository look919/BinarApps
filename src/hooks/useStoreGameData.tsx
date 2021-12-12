import { useState } from 'react';

export const useStoreGameData = () => {
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [userWords, setUserWords] = useState<string[]>([]);
  const [points, setPoints] = useState(0);

  const resetGameData = () => {
    setPoints(0);
    setCorrectWords([]);
    setUserWords([]);
  };

  return { correctWords, userWords, points, setCorrectWords, setUserWords, setPoints, resetGameData };
};
