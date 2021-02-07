<template>
  <div>
    <b-modal
      ref="modal-confirmation"
      scrollable
      title="Confirm subscriptions"
    >
      <b-table-simple
        hover
        small
        caption-top
        responsive
      >
        <caption>Confirm your subscription choices</caption>
        <b-thead>
          <b-tr>
            <b-th>
              Product
            </b-th>
            <b-th class="text-right">
              FlexPoints
            </b-th>
            <b-th />
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-for="productId in selectedProductIds"
            :key="productId"
          >
            <b-td>
              {{ productFromId(productId).name }}
            </b-td>
            <b-td class="text-right">
              {{ productFromId(productId).price }}
            </b-td>
            <b-td>
              <b-button
                :disabled="busySubscribingProducts"
                @click="removeProductId(productId)"
              >
                [remove]
              </b-button>
            </b-td>
          </b-tr>
          <!---->
          <!-- Totals -->
          <!---->
        </b-tbody>
        <b-tfoot>
          <b-tr>
            <b-td class="text-right">
              Total Cost
            </b-td>
            <b-td
              class="text-right"
            >
              {{ totalPrice }}
            </b-td>
            <b-td />
          </b-tr>
          <b-tr>
            <b-td class="text-right">
              Your current FlexPoints
            </b-td>
            <b-td
              class="text-right"
            >
              {{ userBalance }}
            </b-td>
            <b-td />
          </b-tr>
          <b-tr>
            <b-td class="text-right">
              Remaining FlexPoints
            </b-td>
            <b-td
              class="text-right"
            >
              {{ userBalance - totalPrice }}
            </b-td>
            <b-td />
          </b-tr>
          <b-tr>
            <b-td
              colspan="3"
              variant="secondary"
              class="text-right pt-3"
            >
              By subscribing to these products you will use <b>{{ totalPrice }}</b> of your <b>{{ userBalance }}</b> FlexPoints, with <b>{{ userBalance - totalPrice }}</b> FlexPoints left.
            </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
      <!---->
      <!---->
      <!---->
      <template #modal-footer="{ ok, cancel }">
        <b-button
          :disabled="busySubscribingProducts"
          size="sm"
          @click="cancel"
        >
          Cancel
        </b-button>
        <b-button
          :disabled="busySubscribingProducts"
          size="sm"
          variant="success"
          @click="subscribe"
        >
          Subscribe
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SubscriptionConfirmation',
  props: {
    allProducts: {
      type: Array,
      required: true,
    },
    selectedProductIds: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      userBalance: 'auth/userBalance',
      busySubscribingProducts: 'products/busySubscribingProducts',
    }),
    totalPrice() {
      return this.allProducts
        .filter((product) => this.selectedProductIds.includes(product.id))
        .reduce((acc, val) => acc + val.price, 0);
    },
  },
  methods: {
    ...mapActions({
      subscribeProducts: 'products/subscribeProducts',
    }),
    showModal() {
      const modal = this.$refs['modal-confirmation'];
      if (modal) {
        modal.show();
      }
    },
    closeModal() {
      const modal = this.$refs['modal-confirmation'];
      if (modal) {
        modal.hide();
      }
    },
    removeProductId(productId) {
      this.$emit('remove-product-id', productId);
      // Last one?
      this.$nextTick(() => {
        // $nextTick because we need to wait for it to reflect back on the passed prop
        if (!this.selectedProductIds.length) {
          this.closeModal();
        }
      });
    },
    productFromId(productId) {
      return this.allProducts.find((p) => p.id === productId);
    },
    async subscribe() {
      await this.subscribeProducts(this.selectedProductIds);
    },
  },
};
</script>
