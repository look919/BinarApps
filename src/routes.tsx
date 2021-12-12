import React, { Suspense, lazy } from 'react';
import { Navigate, RouteObject } from 'react-router';
import { LoadingScreen } from './LoadingScreen';
import { GameGuard } from './GameGuard';
import { GuestGuard } from './GuestGuard';

const Loadable = Component => props => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const Login = Loadable(lazy(() => import('src/pages/LoginPage')));
const Game = Loadable(lazy(() => import('src/pages/gamePage')));
const GameResult = Loadable(lazy(() => import('src/pages/GameResultPage')));

export const routes: RouteObject[] = [
  {
    path: '/app',
    element: <GameGuard />,
    children: [
      {
        path: '/app',
        element: <Navigate to='/app/game' />
      },
      {
        path: '/app/game',
        element: <Game />
      },
      {
        path: '/app/game-result',
        element: <GameResult />
      }
    ]
  },
  {
    path: '/',
    element: <GuestGuard />,
    children: [
      {
        path: '/',
        element: <Navigate to='/login' />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '*',
        element: <Navigate to='/login' />
      }
    ]
  }
];
