import React from 'react';
import clsx from 'clsx';
import { Typography, makeStyles } from '@material-ui/core';
import { useGameContext } from 'src/contexts/GameContext';

const useStyles = makeStyles({
  singleWord: {
    gridRow: '2 / 3'
  },
  correctWord: {
    color: 'lightgreen'
  },
  badWord: {
    color: 'red'
  },
  notPickedWord: {
    color: 'inherit'
  }
});

interface SingleWordProps {
  word: string;
}

export const SingleWord = ({ word }: SingleWordProps) => {
  const classes = useStyles();
  const { isWordPicked, isCorrectWordPicked } = useGameContext();

  const isWordNotPickedYet = !isWordPicked(word);
  const isWordCorrect = isCorrectWordPicked(word);

  return (
    <Typography
      variant='body1'
      className={clsx(
        classes.singleWord,
        isWordCorrect ? classes.correctWord : classes.badWord,
        isWordNotPickedYet && classes.notPickedWord
      )}
    >
      {word}
    </Typography>
  );
};

export const WordChoosingResult = ({ word }: SingleWordProps) => {
  const classes = useStyles();
  const { isCorrectWordPicked } = useGameContext();
  const isWordCorrect = isCorrectWordPicked(word);

  return (
    <Typography variant='body1' className={isWordCorrect ? classes.correctWord : classes.badWord}>
      {isWordCorrect ? 'Good' : 'Bad'}
    </Typography>
  );
};
