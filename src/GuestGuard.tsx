import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PageLayout } from 'src/pages/PageLayout';
import { useGameContext } from 'src/contexts/GameContext';

export const GuestGuard = () => {
  const { isGameInProgress } = useGameContext();

  if (isGameInProgress) {
    return <Navigate to='/app/game' />;
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};
