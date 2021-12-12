import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { useStoreGameData } from 'src/hooks/useStoreGameData';
import { ReactSetStateAction } from 'src/utils/types';

type GameStage = 'NOT_STARTED' | 'IN_PROGRESS' | 'ANSWERS_CHECKED' | 'RESULT_PAGE';

interface ContextValues {
  points: number;
  gameStage: GameStage;
  handleStartGame: () => void;
  setCorrectWords: ReactSetStateAction<string[]>;
  handlePickWord: (pickedWord: string) => void;
  isWordPickedByUser: (word: string) => boolean;
  isCorrectWordPicked: (word: string) => boolean;
  checkAnswersAndCountPoints: () => void;
  resetGame: () => void;
  finishGame: () => void;
}

const GameContext = React.createContext<ContextValues | undefined>(undefined);

const GameContextProvider: FC = ({ children }) => {
  const navigate = useNavigate();
  const [gameStage, setGameStage] = useState<GameStage>('NOT_STARTED');
  const { userWords, correctWords, points, setUserWords, setCorrectWords, setPoints, resetGameData } = useStoreGameData();

  const handleStartGame = () => {
    setGameStage('IN_PROGRESS');
    navigate('/app/game');
  };

  const isWordPickedByUser = (word: string) => userWords.includes(word);
  const isCorrectWordPicked = (word: string) => correctWords.includes(word);

  const handlePickWord = (pickedWord: string) => {
    const wordWasAlreadyPicked = isWordPickedByUser(pickedWord);
    wordWasAlreadyPicked
      ? setUserWords(prevState => prevState.filter(word => word !== pickedWord))
      : setUserWords(prevState => [...prevState, pickedWord]);
  };

  const checkAnswersAndCountPoints = () => {
    let finalGameState = {
      correctWords: 0,
      badWords: 0,
      unmarkedCorrectWords: 0
    };

    userWords.forEach(wordPickedByUser => {
      isCorrectWordPicked(wordPickedByUser) ? finalGameState.correctWords++ : finalGameState.badWords++;
    });

    finalGameState.unmarkedCorrectWords = correctWords.filter(correctWord => !isWordPickedByUser(correctWord)).length;

    const gameResult = finalGameState.correctWords * 2 - (finalGameState.badWords + finalGameState.unmarkedCorrectWords);

    setGameStage('ANSWERS_CHECKED');
    setPoints(gameResult);
  };

  const finishGame = () => {
    setGameStage('RESULT_PAGE');
    navigate('/app/game-result');
  };

  const resetGame = () => {
    setGameStage('NOT_STARTED');
    resetGameData();
    navigate('/login');
  };

  const value = {
    points,
    gameStage,
    setCorrectWords,
    handleStartGame,
    handlePickWord,
    isWordPickedByUser,
    isCorrectWordPicked,
    checkAnswersAndCountPoints,
    resetGame,
    finishGame
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
