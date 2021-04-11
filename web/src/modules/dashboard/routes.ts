import type { RouteConfig } from 'vue-router';

import DashboardIntegrations from './components/ProfileIntegrations.vue';
import DashboardAccount from './components/DashboardAccount.vue';
import DashboardPreferences from './components/DashboardPreferences.vue';
import { DashboardRoute } from './types';

const createRoutes = (): (RouteConfig & { name: DashboardRoute })[] => [
  {
    name: DashboardRoute.ACCOUNT,
    path: '/account',
    component: DashboardAccount,
  },
  {
    name: DashboardRoute.CREATE_REPORT,
    path: '/mikrobiom',
    component: DashboardPreferences,
  },
  {
    name: DashboardRoute.REPORT,
    path: '/mikrobiom-report',
    component: DashboardIntegrations,
  },
  {
    name: DashboardRoute.UNKNOWN,
    path: '/*',
    redirect: { name: DashboardRoute.CREATE_REPORT },
  },
  {
    name: DashboardRoute.ROOT,
    path: '',
    redirect: { name: DashboardRoute.CREATE_REPORT },
  },
];

export default createRoutes;
