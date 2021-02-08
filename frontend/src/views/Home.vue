<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <template v-if="!isAuthenticated">
      <b-jumbotron
        :header="$t('home.benefits')"
        :lead="$t('home.hiThere')"
      >
        <p>
          {{ $t('home.signInToSeeAndManageYourBenefits') }}
        </p>
        <b-button
          v-if="!signInPopoverIsOpen"
          variant="primary"
          data-testid="button-sign-in"
          @click="updateSignInPopoverOpenStatus(true)"
        >
          {{ $t('home.login') }}
        </b-button>
      </b-jumbotron>
    </template>
    <template v-else>
      <user-info
        class="mt-4"
      />
      <product-list
        class="mt-4"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// @ is an alias to /src
import ProductList from '@/components/ProductList.vue';
import UserInfo from '@/components/UserInfo.vue';

export default {
  name: 'Home',
  components: {
    ProductList,
    UserInfo,
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
      updateSignInPopoverOpenStatus: 'auth/updateSignInPopoverOpenStatus',
    }),
  },
};
</script>

<style lang="scss" scoped>
.jumbotron {
  //background-color: #F5EBE3;
  background-color: transparent;
}
</style>
