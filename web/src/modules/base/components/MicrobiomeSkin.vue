<template>
  <div class="MicrobiomeSkin">
    <v-img src="../../dashboard/assets/bg-gradient-1.png" :max-height="200" contain>
      <v-row>
        <v-col>
          <h3 class="text-h4 text-center white--text px-4">Kožný Mikrobióm</h3>
        </v-col>
      </v-row>
    </v-img>

    <v-row class="MicrobiomeSkin__cards">
      <v-col class="col-12 col-sm-6">
        <Card class="elevation-0">
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Card>
      </v-col>
      <v-col class="col-12 col-sm-6">
        <Card class="elevation-0">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Card>
      </v-col>
      <v-col class="col-12 col-sm-6">
        <Card class="elevation-0">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Card>
      </v-col>
      <v-col class="col-12 col-sm-6">
        <Card class="elevation-0">
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-img src="../../dashboard/assets/bg-1.png" :max-height="250">
          <h3 class="text-h5 white--text">Spoznajte Vaše baktérie</h3>
          <v-btn class="my-8" :to="{ name: DashboardRoute.ROOT }"> Chcem zistiť viac </v-btn>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import LightboxImg from '@/modules/utils/components/LightboxImg.vue';
import Card from './Card.vue';
import { DashboardRoute } from '../../dashboard/types';

const MicrobiomeSkin = defineComponent({
  name: 'MicrobiomeSkin',
  components: {
    LightboxImg,
    Card,
  },
  setup() {
    return {
      DashboardRoute,
    };
  },
});

export default MicrobiomeSkin;
</script>

<style lang="scss">
@import 'vuetify/src/styles/styles';
.MicrobiomeSkin {
  &__cards {
    padding-top: 50px;
    padding-bottom: 100px;
  }

  .Card {
    height: 200px;
  }

  .v-responsive__content {
    width: 100% !important;
    height: 100% !important;
    align-self: center;

    .col {
      align-self: center;
    }
  }

  li {
    padding-bottom: $spacer * 2;

    &::marker {
      padding-right: $spacer;
    }
  }
}
</style>
>
