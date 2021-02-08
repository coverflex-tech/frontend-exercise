<template>
  <div
    v-if="user"
    class="user-info-wrapper"
  >
    <h4>
      Welcome, {{ user.user_id }}
    </h4>
    <small>
      Since {{ user.inserted_at | moment('LL') }}
    </small>

    <div class="mt-1 mb-3">
      {{ userBalance }} FlexPoints available
    </div>
    <template v-if="userProducts.length">
      <div>
        Your Benefits
        <div
          v-for="(product) in userProducts"
          :key="`user-product-${product.id}`"
        >
          - {{ product.name }}
        </div>
      </div>
    </template>
    <template v-else>
      You have no benefits yet.
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
