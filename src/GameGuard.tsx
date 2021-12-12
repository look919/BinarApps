import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PageLayout } from 'src/pages/PageLayout';
import { useGetGameDetails } from './hooks/useGetGameDetails';

export const GameGuard = () => {
  const { isGameInProgress } = useGetGameDetails();

  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string>(null);

  if (!isGameInProgress) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }

    return <Navigate to='/login' />;
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};
