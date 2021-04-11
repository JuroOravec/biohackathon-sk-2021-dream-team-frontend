import type { RouteConfig } from 'vue-router';

import DashboardOverview from './components/DashboardOverview.vue';
import DashboardAccount from './components/DashboardAccount.vue';
import DashboardPreferences from './components/DashboardPreferences.vue';
import { DashboardRoute } from './types';

const createRoutes = (): (RouteConfig & { name: DashboardRoute })[] => [
  {
    name: DashboardRoute.ACCOUNT,
    path: '/nastavenia',
    component: DashboardAccount,
  },
  {
    name: DashboardRoute.CREATE_REPORT,
    path: '/mikrobiom',
    component: DashboardPreferences,
  },
  {
    name: DashboardRoute.OVERVIEW,
    path: '/prehlad',
    component: DashboardOverview,
  },
  {
    name: DashboardRoute.UNKNOWN,
    path: '/*',
    redirect: { name: DashboardRoute.OVERVIEW },
  },
  {
    name: DashboardRoute.ROOT,
    path: '',
    redirect: { name: DashboardRoute.CREATE_REPORT },
  },
];

export default createRoutes;
