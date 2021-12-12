import React from 'react';
import clsx from 'clsx';
import { Typography, makeStyles } from '@material-ui/core';
import { useGameContext } from 'src/contexts/GameContext';
import { useGetGameDetails } from 'src/hooks/useGetGameDetails';

const useStyles = makeStyles({
  singleWord: {
    gridRow: '2 / 3'
  },
  correctWordColor: {
    color: 'lightgreen'
  },
  badWordColor: {
    color: 'red'
  },
  hideColors: {
    color: 'inherit'
  },
  pickedWord: {
    fontWeight: 600
  }
});

interface SingleWordProps {
  word: string;
}

export const SingleWord = ({ word }: SingleWordProps) => {
  const classes = useStyles();
  const { isWordPickedByUser, isCorrectWordPicked } = useGameContext();
  const { areAnswersRevealed } = useGetGameDetails();

  const isWordPicked = isWordPickedByUser(word);
  const isWordPickedCorrect = isWordPicked && isCorrectWordPicked(word);
  const shouldNotSwitchColorYet = !areAnswersRevealed;

  return (
    <Typography
      variant='body1'
      className={clsx(
        classes.singleWord,
        isWordPickedCorrect ? classes.correctWordColor : classes.badWordColor,
        shouldNotSwitchColorYet && classes.hideColors,
        isWordPicked ? classes.pickedWord : classes.hideColors
      )}
    >
      {word}
    </Typography>
  );
};

export const WordChoosingResult = ({ word }: SingleWordProps) => {
  const classes = useStyles();
  const { isCorrectWordPicked } = useGameContext();
  const { areAnswersRevealed } = useGetGameDetails();

  if (!areAnswersRevealed) return null;

  const isWordCorrect = isCorrectWordPicked(word);

  return (
    <Typography variant='body1' className={isWordCorrect ? classes.correctWordColor : classes.badWordColor}>
      {isWordCorrect ? 'Good' : 'Bad'}
    </Typography>
  );
};
