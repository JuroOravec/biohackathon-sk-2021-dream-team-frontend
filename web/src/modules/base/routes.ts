import type { RouteConfig } from 'vue-router';

import { BaseRoute } from './types';
import Home from './components/Home.vue';
import Microbiome from './components/Microbiome.vue';
import MicrobiomeSkin from './components/MicrobiomeSkin.vue';
import PrivacyPolicy from './components/PrivacyPolicy.vue';

const createRoutes = (): RouteConfig[] => {
  const routes: (RouteConfig & { name: BaseRoute })[] = [
    {
      name: BaseRoute.UNKNOWN,
      path: '/*',
      redirect: { name: BaseRoute.HOME },
    },
    {
      name: BaseRoute.PRIVACY_POLICY,
      path: '/privacy',
      components: {
        default: PrivacyPolicy,
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      name: BaseRoute.HOME,
      path: '',
      components: {
        default: Home,
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      name: BaseRoute.MICROBIOME,
      path: 'mikrobiom',
      components: {
        default: Microbiome,
      },
      meta: {
        requireAuth: false,
      },
    },
    {
      name: BaseRoute.MICROBIOME_SKIN,
      path: 'kozny-mikrobiom',
      components: {
        default: MicrobiomeSkin,
      },
      meta: {
        requireAuth: false,
      },
    },
  ];

  return routes;
};

export default createRoutes;
