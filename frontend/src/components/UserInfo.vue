<template>
  <div
    v-if="user"
    class="user-info-wrapper"
  >
    <h4>
      {{ $t('userInfo.welcome', { user: user.user_id }) }}
    </h4>
    <small>
      {{ $t('userInfo.since') }} {{ user.inserted_at | moment('LL') }}
    </small>

    <div class="mt-1 mb-3">
      {{ $t('userInfo.availableFlexPoints', { points: userBalance }) }}
    </div>
    <template v-if="userProducts.length">
      <div>
        {{ $t('userInfo.yourBenefits') }}
        <div
          v-for="(product) in userProducts"
          :key="`user-product-${product.id}`"
        >
          - {{ product.name }}
        </div>
      </div>
    </template>
    <template v-else>
      {{ $t('userInfo.noBenefitsYet') }}
    </template>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'UserInfo',
  // props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      userProductsIds: 'auth/userProductsIds',
      userBalance: 'auth/userBalance',
      allProducts: 'products/allProducts',
    }),
    userProducts() {
      return this.allProducts.filter((product) => this.userProductsIds.includes(product.id));
    },
  },
  created() {
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.user-info-wrapper {
  width: 100%;
  padding: 2rem;
  text-align: left;
  background-color: white;
}
</style>
