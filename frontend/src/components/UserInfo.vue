<template>
  <div
    v-if="user"
    class="product-list-wrapper"
  >
    <h4>
      {{ user.user_id }}
    </h4>
    <h6>
      Since {{ user.inserted_at }}
    </h6>

    <h6>
      Balance: {{ userBalance }} FlexPoints
    </h6>
    <h6>
      Your products: {{ userProductsNames }}
    </h6>
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
      userProducts: 'auth/userProducts',
      userBalance: 'auth/userBalance',
      allProducts: 'products/allProducts',
    }),
    userProductsNames() {
      return this.allProducts
        .filter((product) => this.userProducts.includes(product.id))
        .map((product) => product.name);
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

.product-list-wrapper {
  width: fit-content;
  padding: 2rem;
  text-align: left;
  background-color: white;
}
</style>
