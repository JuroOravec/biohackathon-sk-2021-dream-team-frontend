<template>
  <div class="Home">
    <v-img src="../assets/bg-banner-1.png" contain />

    <v-row class="Home__cards">
      <v-col>
        <router-link :to="{ name: DashboardRoute.ROOT }">
          <Card class="mx-auto">
            <v-img
              src="../assets/microbiome-gut-1.png"
              contain
              :max-height="200"
              :max-width="200"
            />
          </Card>
          <p class="text-body-1 font-weight-bold text-center pa-2">Črevný Mikrobióm</p>
        </router-link>
      </v-col>
      <v-col>
        <router-link :to="{ name: BaseRoute.ROOT }">
          <Card class="mx-auto">
            <v-img
              src="../assets/microbiome-skin-1.png"
              contain
              :max-height="200"
              :max-width="200"
            />
          </Card>
          <p class="text-body-1 font-weight-bold text-center pa-2">Kožný Mikrobióm</p>
        </router-link>
      </v-col>
      <v-col>
        <router-link :to="{ name: DashboardRoute.ROOT }">
          <Card class="mx-auto">
            <v-img
              src="../assets/microbiome-oral-1.png"
              contain
              :max-height="200"
              :max-width="200"
            />
          </Card>
          <p class="text-body-1 font-weight-bold text-center pa-2">Ústny Mikrobióm</p>
        </router-link>
      </v-col>
      <v-col>
        <router-link :to="{ name: DashboardRoute.ROOT }">
          <Card class="mx-auto">
            <v-img
              src="../assets/microbiome-vaginal-1.png"
              contain
              :max-height="200"
              :max-width="200"
            />
          </Card>
          <p class="text-body-1 font-weight-bold text-center pa-2">Vaginálny Mikrobióm</p>
        </router-link>
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
import { BaseRoute } from '../types';

const Home = defineComponent({
  name: 'Home',
  components: {
    LightboxImg,
    Card,
  },
  setup() {
    return {
      DashboardRoute,
      BaseRoute,
    };
  },
});

export default Home;
</script>

<style lang="scss">
@import 'vuetify/src/styles/styles';
.Home {
  &__cards {
    padding-top: 100px;
    padding-bottom: 100px;
  }

  .Card {
    width: 200px;
    height: 200px;
  }

  .v-responsive__content {
    width: 100% !important;
    height: 100% !important;
    align-self: center;
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
