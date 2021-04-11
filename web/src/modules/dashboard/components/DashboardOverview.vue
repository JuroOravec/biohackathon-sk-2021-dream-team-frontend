<template>
  <v-row class="DashboardOverview">
    <v-col>
      <ProfileCard>
        <v-col class="col-12">
          <v-img src="../assets/bg-overview-1.png" contain>
            <h3 class="text-h4 white--text pa-4">
              Prehľad
            </h3>
          </v-img>
        </v-col>
        <v-col class="col-12 col-sm-6">
          <ProfileCard>
            <template #title>
              Lorem ipsum dolor sit amet
            </template>
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ProfileCard>
        </v-col>
        <v-col class="col-12 col-sm-6">
          <ProfileCard>
            <template #title>
              Excepteur sint occaecat cupidatat non proident
            </template>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ProfileCard>
        </v-col>
      </ProfileCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import ProfileCard from './ProfileCard.vue';

const DashboardOverview = defineComponent({
  name: 'DashboardOverview',
  components: {
    ProfileCard,
  },
});

export default DashboardOverview;
</script>

<style lang="scss">
@import '~vuetify/src/styles/main';
.DashboardOverview {
  min-width: 300px;

  .v-responsive__content {
    width: 100% !important;
    height: 100% !important;
  }

  &__item {
    & + & {
      @extend .mt-8;
    }
  }
}
</style>
