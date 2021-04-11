<template>
  <v-row class="DashboardAccount">
    <v-col>
      <ProfileCard>
        <v-col class="col-12">
          <v-img src="../assets/bg-gradient-1.png" :max-height="200" contain>
            <h3 class="text-h4 white--text px-4">
              Nastavenia
            </h3>
          </v-img>
        </v-col>
        <v-col>
          <v-img src="../assets/placeholder-stepper.png" contain />
        </v-col>
      </ProfileCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import ProfileCard from './ProfileCard.vue';

const DashboardAccount = defineComponent({
  name: 'DashboardAccount',
  components: {
    ProfileCard,
  },
});

export default DashboardAccount;
</script>

<style lang="scss">
@import '~vuetify/src/styles/main';
.DashboardAccount {
  min-width: 300px;

  .v-responsive__content {
    width: 100% !important;
    height: 100% !important;
    align-self: center;
  }

  &__item {
    & + & {
      @extend .mt-8;
    }
  }
}
</style>
