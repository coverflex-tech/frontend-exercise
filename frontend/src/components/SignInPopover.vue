<template>
  <b-popover
    v-if="!isAuthenticated"
    :show="signInPopoverIsOpen"
    target="popover-button-sync"
    triggers="focus"
    title="Sign in as employee"
    placement="bottomright"
    @show="onSignInPopoverShow"
    @hide="onSignInPopoverHide"
  >
    <div>
      <b-form-input
        v-model="signInUsername"
        placeholder="Enter your username"
        autofocus
        name="username"
        @keyup.enter="signInUsername && signIn(signInUsername)"
      />
      <div class="mt-2 ml-auto">
        <b-button
          :disabled="!signInUsername"
          @click="signIn(signInUsername)"
        >
          sign in
          <!--          <b-spinner label="Spinning" />-->
        </b-button>
      </div>
    </div>
  </b-popover>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SignInPopover',
  props: {},
  data() {
    return {
      signInUsername: '',
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      signInPopoverIsOpen: 'auth/signInPopoverIsOpen',
      userId: 'auth/userId',
    }),
  },
  methods: {
    ...mapActions({
      storeSignIn: 'auth/signIn',
      updateSignInPopoverOpenStatus: 'auth/updateSignInPopoverOpenStatus',
    }),
    onSignInPopoverShow() {
      this.updateSignInPopoverOpenStatus(true);
    },
    onSignInPopoverHide() {
      this.updateSignInPopoverOpenStatus(false);
      // Reset username
      this.signInUsername = '';
    },
    async signIn(username) {
      await this.storeSignIn(username);
      if (this.isAuthenticated && this.userId) {
        this.$bvToast.toast('Welcome back!', {
          title: `Hi ${this.userId}`,
          toaster: 'b-toaster-bottom-right',
          autoHideDelay: 5000,
          variant: 'info',
        });
      }
    },
  },
};
</script>
