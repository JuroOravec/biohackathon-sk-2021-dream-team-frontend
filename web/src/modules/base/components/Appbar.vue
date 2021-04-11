<template>
  <v-app-bar
    app
    flat
    color="white"
    class="Appbar"
    :class="{ 'Appbar--expanded': expanded, 'Appbar--logged-in': isLoggedIn }"
  >
    <v-container class="py-0 fill-height">
      <v-row class="fill-height" :justify="$vuetify.breakpoint.xsOnly ? 'space-between' : undefined" align="center">
        <v-col
          cols="auto"
          class="Appbar__title fill-height"
          :class="{ 'px-0': $vuetify.breakpoint.xsOnly }"
        >
          <router-link to="/" class="fill-height">
            <v-app-bar-title class="title fill-height d-flex align-center">
              <v-img src="../assets/omnibio-logo.png" contain :max-height="44" :max-width="150">
                <div class="LoginAvatar__avatar-overlay transition-fast-in-fast-out" />
              </v-img>
            </v-app-bar-title>
          </router-link>
        </v-col>

        <v-spacer class="col-1" />

        <v-app-bar-nav-icon v-if="$vuetify.breakpoint.xsOnly" @click="setExpanded(!expanded)" />

        <v-col
          v-if="!$vuetify.breakpoint.xsOnly || expanded"
          class="Appbar__content fill-height"
          :class="{ 'col-auto': !expanded, 'col-12': expanded }"
        >
          <div
            v-for="link in links"
            :key="'appbar-item-' + link.title"
            class="Appbar__nav-item fill-height"
            :class="{ 'px-0': $vuetify.breakpoint.xsOnly }"
          >
            <router-link class="fill-height d-flex" :to="link.to">
              <v-btn text class="fill-height px-2">
                {{ link.title }}
              </v-btn>
            </router-link>
          </div>
        </v-col>

          <v-spacer class="col-auto" />

        <v-col>
          <div
            class="Appbar__nav-item fill-height d-flex"
            :class="{ 'px-0': $vuetify.breakpoint.xsOnly, 'pl-4': !$vuetify.breakpoint.xsOnly }"
          >
            <v-icon class="fill-height d-flex" color="primary">
              shopping_cart
            </v-icon>
          </div>
          <div
            class="Appbar__nav-item fill-height d-flex"
            :class="{ 'px-0': $vuetify.breakpoint.xsOnly, 'pl-4': !$vuetify.breakpoint.xsOnly }"
          >
            <v-icon class="fill-height d-flex" color="primary">
              account_circle
            </v-icon>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, unref, watch } from '@vue/composition-api';
import type { Location } from 'vue-router';

import LoginMenu from '@/modules/auth/components/LoginMenu.vue';
import { DashboardRoute } from '@/modules/dashboard/types';
import useCurrentUser from '@/modules/auth/composables/useCurrentUser';
import useRefRich from '@/modules/utils-reactivity/composables/useRefRich';

const appbarLinks: {
  title: string;
  to: Location;
  requireAuth: boolean;
}[] = [
  {
    title: 'Domov',
    to: { name: DashboardRoute.ROOT },
    requireAuth: false,
  },
  {
    title: 'Produkty',
    to: { name: DashboardRoute.ROOT },
    requireAuth: false,
  },
  {
    title: 'Mikrobióm',
    to: { name: DashboardRoute.ROOT },
    requireAuth: true,
  },
  {
    title: 'O nás',
    to: { name: DashboardRoute.ROOT },
    requireAuth: true,
  },
];

const Appbar = defineComponent({
  name: 'Appbar',
  components: {
    LoginMenu,
  },
  setup() {
    const { ref: expanded, setter: setExpanded } = useRefRich({ value: false });

    const instance = getCurrentInstance();
    const { isLoggedIn } = useCurrentUser();

    const links = computed(() =>
      appbarLinks.filter((link) => !link.requireAuth || unref(isLoggedIn))
    );

    watch(
      () => instance?.proxy.$vuetify.breakpoint.xsOnly,
      (isXsOnly) => {
        if (!isXsOnly && unref(expanded)) setExpanded(false);
      }
    );

    return {
      links,
      expanded,
      setExpanded,
      isLoggedIn,
    };
  },
});

export default Appbar;
</script>

<style lang="scss">
.Appbar {
  overflow: hidden;
  transition: height 0.25s ease-in-out;

  &__nav {
    &-item {
      display: flex;
      flex-direction: column;

      .v-btn {
        height: unset !important;
        flex: 1 1 auto;
      }
    }
  }

  .title {
    color: white;
  }

  .col {
    display: flex;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;
  }

  .v-toolbar__content {
    padding-top: 0;
    padding-bottom: 0;
  }

  .v-app-bar-title {
    justify-content: center;
  }

  .v-app-bar-title__content,
  .v-app-bar-title__placeholder {
    flex: 0 1 auto;
    text-overflow: unset;
  }

  .LoginAvatar {
    margin-top: 3 * $spacer;

    &__avatar {
      padding-bottom: 2 * $spacer !important;
      padding-top: 2 * $spacer !important;
    }
  }

  &#{&}--expanded {
    height: 50vh !important;

    .Appbar__content {
      flex-direction: column;
    }

    .Appbar__nav-item {
      width: 100%;
      padding-bottom: 8 * $spacer;
      padding-top: 8 * $spacer;
      border-bottom: 1px solid var(--v-primary-lighten3);
      text-align: center;
    }

    .LoginAvatar {
      margin-top: -5 * $spacer;
    }
  }

  &#{&}--logged-in {
    .LoginAvatar {
      &__avatar {
        padding-bottom: 0 !important;
        padding-top: 0 !important;
      }
    }
  }
}
</style>
