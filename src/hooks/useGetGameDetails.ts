import { useGameContext } from 'src/contexts/GameContext';

export const useGetGameDetails = () => {
  const { gameStage } = useGameContext();

  const isGameInProgress = gameStage !== 'NOT_STARTED';
  const areAnswersRevealed = gameStage === 'ANSWERS_CHECKED';

  return { isGameInProgress, areAnswersRevealed };
};
