<template>
  <v-card class="Card elevation-3" :class="{ 'Card--no-title': !$slots['title'] }">
    <v-row class="Card__title">
      <v-col cols="auto" class="px-0">
        <v-card-title>
          <slot name="title" />
        </v-card-title>
      </v-col>
      <slot name="title-append" />
    </v-row>

    <v-card-text class="Card__body">
      <v-row>
        <slot />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const Card = defineComponent({
  name: 'Card',
});

export default Card;
</script>

<style lang="scss">
@import '~vuetify/src/styles/main';
.Card {
  padding: 3 * $spacer;

  & + & {
    margin-top: 8 * $spacer;
  }

  &__title {
    margin: 3 * $spacer 0;

    .col {
      padding-bottom: 0;
      padding-top: 0;
    }
    .v-card__title {
      padding-bottom: 0;
      padding-top: 0;
    }
  }

  &--no-title {
    .Card__title {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
</style>
