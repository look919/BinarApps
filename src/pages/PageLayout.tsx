import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  appContainer: {
    maxWidth: '30rem',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export const PageLayout: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageContainer}>
      <div className={classes.appContainer}>{children}</div>
    </div>
  );
};
