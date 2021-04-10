<template>
  <Page>
    <template slot="menu-left">
      <ProfileMenu />
    </template>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import Page from '@/modules/base/components/Page.vue';
import ProfileMenu from './ProfileMenu.vue';

const ProfilePage = defineComponent({
  name: 'ProfilePage',
  components: {
    Page,
    ProfileMenu,
  },
});

export default ProfilePage;
</script>
