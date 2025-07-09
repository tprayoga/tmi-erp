import { lazy } from 'react';
import { AuthRoutes } from './auth';
import { PublicRoutes } from './public';
import { DashboardRoutes } from './dashboard';
import { ComponentRoutes } from './components'; // GLOBAL ERROR PAGE

const ErrorPage = lazy(() => import('@/pages/404')); // LANDING / INITIAL PAGE

const Landing = lazy(() => import('@/pages/landing'));
const Login = lazy(() => import('@/pages/sessions/login'));
export const routes = () => {
  return [// INITIAL / INDEX PAGE
  {
    path: '/',
    element: <Login />
  }, // GLOBAL ERROR PAGE
  {
    path: '*',
    element: <ErrorPage />
  }, // AUTHENTICATION PAGES ROUTES & DIFFERENT AUTH DEMO PAGES ROUTES
  ...AuthRoutes, // COMPONENTS PAGES ROUTES
  ...ComponentRoutes, // INSIDE DASHBOARD PAGES ROUTES
  ...DashboardRoutes, // PAGES ROUTES
  ...PublicRoutes];
};