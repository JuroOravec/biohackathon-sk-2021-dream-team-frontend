<template>
  <v-footer class="AppFooter">
    <v-row class="AppFooter__container text-body-2 my-2 mx-8 pt-2 pb-4">
      <v-col cols="auto" class="pt-0 pb-1" :class="{ 'px-1': $vuetify.breakpoint.xsOnly }">
        Imprint
      </v-col>

      <v-spacer cols="2" />

      <v-col cols="auto" class="pt-0 pb-1" :class="{ 'px-1': $vuetify.breakpoint.xsOnly }">
        <v-row>
          <v-col class="pt-2 pb-3">
            O nás
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-2 pb-3">
            Kontakt
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-2 pb-3">
            Výskum mikrobiómu
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="auto" class="pt-0 pb-1" :class="{ 'px-1': $vuetify.breakpoint.xsOnly }">
        <v-row>
          <v-col class="pt-2 pb-3">
            Ochrana osobných údajov
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-2 pb-3">
            Podmienky
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-2 pb-3">
            Pravidlá používania súborov cookie
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="AppFooter__container text-body-2 my-2">
      © 2021 Omni Bio. Všetky práva vyhradené
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { BaseRoute } from '../types';

const AppFooter = defineComponent({
  name: 'AppFooter',
  setup() {
    return {
      BaseRoute,
    };
  },
});

export default AppFooter;
</script>

<style lang="scss">
.AppFooter {
  display: initial;

  &__container {
    justify-content: center;
  }
  &__link {
    font-weight: bold;
  }
}
</style>
