<template>
  <ListMenu :sections="sections" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import ListMenu from '@/modules/base/components/ListMenu.vue';
import type { ListMenuSection } from '@/modules/base/types';
import { DashboardRoute } from '../types';

const menuSections: (ListMenuSection & { to: { name: DashboardRoute } })[] = [
  {
    groupId: 'settings',
    sectionId: DashboardRoute.OVERVIEW,
    title: 'Prehľad',
    to: { name: DashboardRoute.OVERVIEW },
  },
  {
    groupId: 'settings',
    sectionId: DashboardRoute.CREATE_REPORT,
    title: 'Môj mikrobióm',
    to: { name: DashboardRoute.CREATE_REPORT },
  },
  {
    groupId: 'settings',
    sectionId: DashboardRoute.ACCOUNT,
    title: 'Nastavenia',
    to: { name: DashboardRoute.ACCOUNT },
  },
];

const DashboardMenu = defineComponent({
  name: 'DashboardMenu',
  components: {
    ListMenu,
  },
  setup: () => {
    return {
      sections: menuSections,
    };
  },
});

export default DashboardMenu;
</script>

<style lang="scss">
.DashboardMenu {
}
</style>
>
