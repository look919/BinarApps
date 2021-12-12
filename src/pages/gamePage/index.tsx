import React from 'react';
import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import { Button } from 'src/components';
import { useGetRandomQuestion } from 'src/hooks/useGetRandomQuestion';
import { useGameContext } from 'src/contexts/GameContext';
import { GameSkeleton } from './GameSkeleton';
import { SingleWord, WordChoosingResult } from './GameWords';

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
    padding: '0.5rem 1rem',
    cursor: 'pointer'
  }
});

const GamePage = () => {
  const classes = useStyles();
  const question = useGetRandomQuestion();
  const { handlePickWord, isWordPicked, countPointsAndGoToTheResultPage } = useGameContext();

  if (question.isLoading) return <GameSkeleton />;

  if (question.isSuccess) {
    const questionData = question.data;

    return (
      <>
        <Typography variant='h5'>{questionData.question}</Typography>
        <Paper className={classes.wordsCloud}>
          {questionData.all_words.map(word => {
            const wasWordAlreadyPicked = isWordPicked(word);

            return (
              <Box key={word} onClick={() => handlePickWord(word)} className={classes.singleWordContainer}>
                {wasWordAlreadyPicked && <WordChoosingResult word={word} />}
                <SingleWord word={word} />
              </Box>
            );
          })}
        </Paper>
        <Button onClick={countPointsAndGoToTheResultPage}>Finish game</Button>
      </>
    );
  }

  return null;
};

export default GamePage;
