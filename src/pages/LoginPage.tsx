import React from 'react';
import { Typography } from '@material-ui/core';
import { Button, TextField } from 'src/components';
import { useUserContext } from 'src/contexts/UserContext';
import { useGameContext } from 'src/contexts/GameContext';

export const LoginPage = () => {
  const { name, handleChangeName, isNameProvided } = useUserContext();
  const { handleStartGame } = useGameContext();

  return (
    <>
      <Typography variant='h3'>Worldcloud game</Typography>
      <TextField
        value={name}
        onChange={handleChangeName}
        fullWidth
        placeholder='Enter your nickname here'
        margin='normal'
        testId='nickname-input'
      />
      <Button onClick={handleStartGame} disabled={!isNameProvided}>
        Play
      </Button>
    </>
  );
};

export default LoginPage;
