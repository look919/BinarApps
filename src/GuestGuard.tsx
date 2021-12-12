import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PageLayout } from 'src/pages/PageLayout';
import { useGetGameDetails } from './hooks/useGetGameDetails';

export const GuestGuard = () => {
  const { isGameInProgress } = useGetGameDetails();

  if (isGameInProgress) {
    return <Navigate to='/app/game' />;
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};
