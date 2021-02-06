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
        <b-navbar-nav class="d-flex align-items-center flex-row justify-content-center">
          <b-nav-item>
            en
          </b-nav-item>
          /
          <b-nav-item active>
            pt
          </b-nav-item>
        </b-navbar-nav>

        <b-nav-item
          id="popover-button-sync"
          @click="clickSignInOrSignOut"
        >
          {{ signInOrSignOutText }}
        </b-nav-item>
        <b-popover
          :show.sync="showSignInPopover"
          target="popover-button-sync"
          triggers="focus"
          title="Sign in as employee"
          placement="bottomright"
          @hide="onSignInPopoverHide"
        >
          <div>
            <b-form-input
              v-model="signInUsername"
              placeholder="Enter your username"
            />
            <div class="mt-2 ml-auto">
              <b-button class="">
                sign in
                <b-spinner label="Spinning" />
              </b-button>
            </div>
          </div>
        </b-popover>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return {
      showSignInPopover: false,
      signInUsername: '',
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
    signInOrSignOutText() {
      return this.isAuthenticated ? 'logout' : 'login';
    },
  },
  methods: {
    clickSignInOrSignOut() {
      if (this.isAuthenticated) {
        console.log('Will sign out!');
      } else {
        this.showSignInPopover = true;
        console.log('Will sign in!');
      }
    },
    onSignInPopoverHide() {
      // Reset username
      this.signInUsername = '';
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
</style>
