import React from 'react';
import { Typography } from '@material-ui/core';
import { Button } from 'src/components';
import { useUserContext } from 'src/contexts/UserContext';
import { useGameContext } from 'src/contexts/GameContext';

const GameResultPage = () => {
  const { name } = useUserContext();
  const { points, resetGame } = useGameContext();

  return (
    <>
      <Typography variant='h5'>Congratulations {name}!</Typography>
      <Typography variant='h5'>Your Score:</Typography>
      <Typography variant='h5' color='primary'>
        {points}
      </Typography>
      <Button onClick={resetGame}>Play Again!</Button>
    </>
  );
};

export default GameResultPage;
