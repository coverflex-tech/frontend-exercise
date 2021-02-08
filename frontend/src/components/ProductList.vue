<template>
  <div class="product-list-wrapper">
    <div class="mb-4">
      <h5>
        Available Benefits
      </h5>
    </div>

    <template v-if="busyLoadingProducts">
      <b-spinner class="m-5" />
    </template>
    <template v-else-if="!allProducts.length">
      No products.
    </template>
    <template v-else>
      <b-card-group
        deck
      >
        <b-card
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <!--          <template #header>-->
          <!--            <h4 class="mb-0">Hello World</h4>-->
          <!--          </template>-->
          <!--          <div class="subscribed-badge">-->
          <!--            <b-badge-->
          <!--              v-if="product.isOwned"-->
          <!--              variant="success"-->
          <!--            >-->
          <!--              Subscribed-->
          <!--              <font-awesome-icon-->
          <!--                icon="check"-->
          <!--              />-->
          <!--            </b-badge>-->
          <!--          </div>-->
          <b-card-title class="mt-3">
            {{ product.name }}
          </b-card-title>
          <!--          img-src="https://picsum.photos/300/300/?image=41"-->
          <!--          img-alt="Image"-->
          <!--          img-top-->
          <!--          <b-card-text>-->
          <!--            xxx-->
          <!--          </b-card-text>-->
          <template #footer>
            <div class="text-right mb-3">
              {{ product.price }} <small class="text-muted">FlexPoints</small>
            </div>
            <div class="d-flex">
              <!--              <small class="text-muted">{{ product.price }} FlexPoints</small>-->
              <b-button
                class="w-100"
                :disabled="product.isOwned || busySubscribingProducts"
                :variant="product.isOwned ? 'success' : selectedProductsIds.includes(product.id) ? 'warning' : ''"
                @click="toggleProductSelection(product.id)"
              >
                <template v-if="product.isOwned">
                  Subscribed
                  <font-awesome-icon
                    icon="check"
                  />
                </template>
                <template v-else-if="selectedProductsIds.includes(product.id)">
                  Deselect
                </template>
                <template v-else>
                  Select
                </template>
              </b-button>
            </div>
          </template>
        </b-card>
      </b-card-group>
      <div class="w-100 text-right">
        <b-button
          :disabled="subscribeSelectedButtonDisabled"
          :variant="subscribeSelectedButtonDisabled ? '' : 'success'"
          class="mt-5 ml-auto confirm-selection-button"
          @click="selectedProductsIds.length && openConfirmSubscriptionModal()"
        >
          Subscribe selected benefits
        </b-button>
      </div>
      <!---->
      <!---->
      <!---->
      <subscription-confirmation
        ref="subscription-confirmation"
      />
      <!---->
      <!---->
      <!---->
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import SubscriptionConfirmation from '@/components/SubscriptionConfirmation.vue';

export default {
  name: 'ProductList',
  components: {
    SubscriptionConfirmation,
  },
  // props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      busyLoadingProducts: 'products/busyLoadingProducts',
      busySubscribingProducts: 'products/busySubscribingProducts',
      allProducts: 'products/allProducts',
      selectedProductsIds: 'products/selectedProductsIds',
      userProductsIds: 'auth/userProductsIds',
    }),
    filteredProducts() {
      return this.allProducts.map((product) => ({
        ...product,
        isOwned: this.userProductsIds.includes(product.id),
      }));
    },
    subscribeSelectedButtonDisabled() {
      return !this.selectedProductsIds.length || this.busySubscribingProducts;
    },
  },
  created() {
  },
  methods: {
    ...mapActions({
      toggleProductSelection: 'products/toggleProductSelection',
    }),
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
  width: 100%;
  padding: 2rem;
  text-align: left;
  background-color: white;
}

.confirm-selection-button {
  min-width: 25%;
}

.subscribed-badge {
  position: absolute;
  top: 0.1rem;
  right: 0.3rem;
}
</style>
