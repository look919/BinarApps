import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { ReactSetStateAction } from 'src/utils/types';

interface ContextValues {
  isGameInProgress: boolean;
  handleStartGame: () => void;
  setCorrectWords: ReactSetStateAction<string[]>;
  handlePickWord: (pickedWord: string) => void;
  isWordPicked: (word: string) => boolean;
  isCorrectWordPicked: (word: string) => boolean;
  countPointsAndGoToTheResultPage: () => void;
  points: number;
  resetGame: () => void;
}

const GameContext = React.createContext<ContextValues | undefined>(undefined);

const GameContextProvider: FC = ({ children }) => {
  const navigate = useNavigate();
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [userWords, setUserWords] = useState<string[]>([]);
  const [points, setPoints] = useState(0);

  const handleStartGame = () => {
    setIsGameInProgress(true);
    navigate('/app/game');
  };

  const isWordPicked = (word: string) => userWords.includes(word);
  const isCorrectWordPicked = (word: string) => correctWords.includes(word);

  const handlePickWord = (pickedWord: string) => {
    const wordWasAlreadyPicker = isWordPicked(pickedWord);
    if (wordWasAlreadyPicker) return;

    setUserWords(prevState => [...prevState, pickedWord]);
    setPoints(prevState => (isCorrectWordPicked(pickedWord) ? prevState + 2 : prevState - 1));
  };

  const countPointsAndGoToTheResultPage = () => {
    let finalGameState = {
      correctWords: 0,
      badWords: 0,
      unmarkedCorrectWords: 0
    };

    userWords.forEach(wordPickedByUser => {
      isCorrectWordPicked(wordPickedByUser) ? finalGameState.correctWords++ : finalGameState.badWords++;
    });

    finalGameState.unmarkedCorrectWords = correctWords.filter(correctWord => !userWords.includes(correctWord)).length;

    const gameResult = finalGameState.correctWords * 2 - (finalGameState.badWords + finalGameState.unmarkedCorrectWords);

    setPoints(gameResult);
    navigate('/app/game-result');
  };

  const resetGame = () => {
    setPoints(0);
    setCorrectWords([]);
    setUserWords([]);
    setIsGameInProgress(false);

    navigate('/login');
  };

  const value = {
    isGameInProgress,
    handleStartGame,
    setCorrectWords,
    handlePickWord,
    isWordPicked,
    isCorrectWordPicked,
    countPointsAndGoToTheResultPage,
    points,
    resetGame
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

function useGameContext() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameContextProvider');
  }
  return context;
}

export { GameContextProvider, useGameContext };
