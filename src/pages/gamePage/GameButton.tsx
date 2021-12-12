import React from 'react';
import { Button } from 'src/components';
import { useGameContext } from 'src/contexts/GameContext';
import { ButtonSkeleton } from './GameSkeleton';

export const GameButton = () => {
  const { gameStage, checkAnswersAndCountPoints, finishGame } = useGameContext();

  switch (gameStage) {
    case 'IN_PROGRESS': {
      return <Button onClick={checkAnswersAndCountPoints}>Check answers</Button>;
    }
    case 'ANSWERS_CHECKED': {
      return <Button onClick={finishGame}>Finish game</Button>;
    }
    default:
      <ButtonSkeleton />;
  }
};
