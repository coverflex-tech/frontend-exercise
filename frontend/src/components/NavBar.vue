<template>
  <b-navbar
    toggleable="lg"
    type="light"
    class="nav-bar"
  >
    <b-navbar-brand href="#">
      <img
        src="coverflex_logo.svg"
        loading="lazy"
        alt=""
      >
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse
      id="nav-collapse"
      is-nav
    >
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav class="flex-row justify-content-center">
          <b-nav-item
            v-for="supportedLocale in supportedLocales"
            :key="supportedLocale.code"
            :active="locale === supportedLocale.code"
            :data-testid="`language-${supportedLocale.code}`"
            class="lang-short d-flex align-items-center"
            @click="changeLang(supportedLocale.code)"
          >
            <!--            :active="supportedLocale.code === locale.code"-->
            {{ supportedLocale.short }}
          </b-nav-item>
        </b-navbar-nav>

        <!--        <b-nav-text-->
        <!--          v-if="isAuthenticated"-->
        <!--          class="ml-3 mr-2"-->
        <!--        >-->
        <!--          Welcome, {{ userId }}!-->
        <!--        </b-nav-text>-->

        <b-nav-item
          id="popover-button-sync"
          data-testid="nav-bar-login-or-logout"
          @click="clickSignInOrSignOut"
        >
          {{ isAuthenticated ? $t('navBar.logout') : $t('navBar.login') }}
        </b-nav-item>
        <sign-in-popover
          ref="signInPopover"
        />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SignInPopover from '@/components/SignInPopover.vue';

export default {
  name: 'NavBar',
  components: {
    SignInPopover,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      userId: 'auth/userId',
      supportedLocales: 'translation/supportedLocales',
      locale: 'translation/locale',
    }),
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut',
      changeLang: 'translation/changeLang',
    }),
    clickSignInOrSignOut() {
      if (this.isAuthenticated) {
        this.signOut();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  padding-top: 2rem;
}

.navbar-light {
  .navbar-nav {
    .nav-link {
      &.active {
        color: var(--accent-color);
      }
    }
  }
}

.nav-item {
  font-weight: bold;
}

.lang-short:not(:last-child)::after {
  content: '/';
  padding: 0 0.2rem;
}
</style>
