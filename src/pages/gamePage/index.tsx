import React from 'react';
import clsx from 'clsx';
import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import { useGetRandomQuestion } from 'src/hooks/useGetRandomQuestion';
import { useGameContext } from 'src/contexts/GameContext';
import { useGetGameDetails } from 'src/hooks/useGetGameDetails';
import { GameSkeleton } from './GameSkeleton';
import { SingleWord, WordChoosingResult } from './GameWords';
import { GameButton } from './GameButton';

const useStyles = makeStyles({
  wordsCloud: {
    margin: '1rem 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '2rem',
    border: '1px solid black'
  },
  singleWordContainer: {
    display: 'grid',
    gridTemplateRows: 'repeat(2, 1.2rem)',
    gridRowGap: '5px',
    alignItems: 'center',
    justifyItems: 'center',
    padding: '0.8rem 1.6rem',
    cursor: 'pointer'
  },
  disableWordActions: {
    pointerEvents: 'none'
  }
});

const GamePage = () => {
  const classes = useStyles();
  const question = useGetRandomQuestion();
  const { handlePickWord, isWordPickedByUser } = useGameContext();
  const { areAnswersRevealed } = useGetGameDetails();

  if (question.isLoading) return <GameSkeleton />;

  if (question.isSuccess) {
    const questionData = question.data;

    return (
      <>
        <Typography variant='h5'>{questionData.question}</Typography>
        <Paper className={classes.wordsCloud}>
          {questionData.all_words.map(word => {
            const wasWordAlreadyPicked = isWordPickedByUser(word);

            return (
              <Box
                key={word}
                onClick={() => handlePickWord(word)}
                className={clsx(classes.singleWordContainer, areAnswersRevealed && classes.disableWordActions)}
              >
                {wasWordAlreadyPicked && <WordChoosingResult word={word} />}
                <SingleWord word={word} />
              </Box>
            );
          })}
        </Paper>
        <GameButton />
      </>
    );
  }

  return null;
};

export default GamePage;
