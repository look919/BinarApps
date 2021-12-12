import React from 'react';
import { useRoutes } from 'react-router';
import { QueryClientProvider, QueryClient } from 'react-query';
import { UserContextProvider } from './contexts/UserContext';
import { GameContextProvider } from './contexts/GameContext';
import { routes } from './routes';

const queryClient = new QueryClient();

export const App = () => {
  const content = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <GameContextProvider>{content}</GameContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
};
