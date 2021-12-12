import React from 'react';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Button } from 'src/components';

export const GameSkeleton = () => (
  <>
    <Skeleton width={140} height={40} />
    <Box my={1}>
      <Skeleton width={300} height={300} />
    </Box>
    <Skeleton>
      <Button>Finish game</Button>
    </Skeleton>
  </>
);
