<template>
  <div class="product-list-wrapper">
    <h4>
      Available Products
    </h4>

    <template v-if="busyLoadingProducts">
      <b-spinner class="m-5" />
    </template>
    <template v-else-if="!allProducts.length">
      No products.
    </template>
    <template v-else>
      <b-card-group deck>
        <b-card
          v-for="product in filteredProducts"
          :key="product.id"
          :title="product.name"
          class="product-list"
        >
          <!--          img-src="https://picsum.photos/300/300/?image=41"-->
          <!--          img-alt="Image"-->
          <!--          img-top-->
          <b-card-text>
            xxx
          </b-card-text>
          <small class="text-muted">{{ product.price }} FlexPoints</small>
          <template #footer>
            <div class="d-flex">
              <!--              <small class="text-muted">{{ product.price }} FlexPoints</small>-->
              <b-button
                class=""
                :disabled="product.isOwned || busySubscribingProducts"
                :variant="product.isOwned ? 'success' : productIdsToSubscribe.includes(product.id) ? 'warning' : ''"
                @click="addOrRemoveFromToSubscribeList(product.id)"
              >
                <template v-if="product.isOwned">
                  Subscribed!
                </template>
                <template v-else-if="productIdsToSubscribe.includes(product.id)">
                  De-select
                </template>
                <template v-else>
                  Select
                </template>
              </b-button>
            </div>
          </template>
        </b-card>
      </b-card-group>
      <div class="w-100">
        <b-button
          :disabled="subscribeSelectedButtonDisabled"
          :variant="subscribeSelectedButtonDisabled ? '' : 'success'"
          class="mt-5 ml-auto confirm-selection-button"
          @click="productIdsToSubscribe.length && openConfirmSubscriptionModal()"
        >
          Subscribe selected benefits
        </b-button>
      </div>
      <!---->
      <!---->
      <!---->
      <subscription-confirmation
        ref="subscription-confirmation"
        :all-products="allProducts"
        :selected-product-ids="productIdsToSubscribe"
        @remove-product-id="addOrRemoveFromToSubscribeList"
      />
      <!---->
      <!---->
      <!---->
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import SubscriptionConfirmation from '@/components/SubscriptionConfirmation.vue';

export default {
  name: 'ProductList',
  components: {
    SubscriptionConfirmation,
  },
  // props: {},
  data() {
    return {
      productIdsToSubscribe: [],
    };
  },
  computed: {
    ...mapGetters({
      busyLoadingProducts: 'products/busyLoadingProducts',
      busySubscribingProducts: 'products/busySubscribingProducts',
      allProducts: 'products/allProducts',
      userProducts: 'auth/userProducts',
    }),
    filteredProducts() {
      return this.allProducts.map((product) => ({
        ...product,
        isOwned: this.userProducts.includes(product.id),
      }));
    },
    subscribeSelectedButtonDisabled() {
      return !this.productIdsToSubscribe.length || this.busySubscribingProducts;
    },
  },
  created() {
  },
  methods: {
    addOrRemoveFromToSubscribeList(productId) {
      if (this.productIdsToSubscribe.includes(productId)) {
        // Remove
        this.productIdsToSubscribe = this.productIdsToSubscribe.filter((pId) => pId !== productId);
      } else {
        // Add
        this.productIdsToSubscribe.push(productId);
      }
    },
    openConfirmSubscriptionModal() {
      const subscriptionConfirmation = this.$refs['subscription-confirmation'];
      if (subscriptionConfirmation && typeof subscriptionConfirmation.showModal === 'function') {
        subscriptionConfirmation.showModal();
      }
    },
  },
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

.confirm-selection-button {
  min-width: 25%;
}
</style>
