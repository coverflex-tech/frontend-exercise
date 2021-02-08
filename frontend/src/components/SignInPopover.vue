<template>
  <b-popover
    v-if="!isAuthenticated"
    :show="signInPopoverIsOpen"
    :title="$t('signInPopover.signInAsEmployee')"
    target="popover-button-sync"
    triggers="focus"
    placement="bottomright"
    @show="onSignInPopoverShow"
    @hide="onSignInPopoverHide"
  >
    <div>
      <b-form-input
        v-model="signInUsername"
        :placeholder="$t('signInPopover.enterUsername')"
        autofocus
        name="username"
        @keyup.enter="signInUsername && signIn(signInUsername)"
      />
      <div class="mt-2 ml-auto">
        <b-button
          :disabled="!signInUsername || busySigningIn"
          @click="signIn(signInUsername)"
        >
          <template v-if="busySigningIn">
            {{ $t('signInPopover.loggingIn') }}
          </template>
          <template v-else>
            {{ $t('signInPopover.login') }}
          </template>
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
      busySigningIn: 'auth/busySigningIn',
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
      try {
        await this.storeSignIn(username);
        if (this.isAuthenticated && this.userId) {
          this.$bvToast.toast(this.$t('signInToast.success.message'), {
            title: this.$t('signInToast.success.title', { user: this.userId }),
            toaster: 'b-toaster-bottom-right',
            autoHideDelay: 5000,
            variant: 'info',
          });
        }
      } catch (error) {
        this.$bvToast.toast(this.$t('signInToast.failure.message'), {
          title: this.$t('signInToast.failure.title'),
          toaster: 'b-toaster-bottom-right',
          autoHideDelay: 5000,
          variant: 'danger',
        });
      }
    },
  },
};
</script>
