<template>
  <div>
    <b-modal
      ref="modal-confirmation"
      :title="$t('subscriptionConfirmation.title')"
      scrollable
    >
      <b-table-simple
        hover
        small
        caption-top
      >
        <!--        <caption>Confirm your subscription choices</caption>-->
        <b-thead>
          <b-tr>
            <b-th>
              {{ $t('subscriptionConfirmation.columnProduct') }}
            </b-th>
            <b-th class="text-right">
              {{ $t('subscriptionConfirmation.columnFlexPoints') }}
            </b-th>
            <b-th />
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-for="productId in selectedProductsIds"
            :key="productId"
          >
            <b-td>
              {{ productFromId(productId).name }}
            </b-td>
            <b-td class="text-right">
              {{ productFromId(productId).price }}
            </b-td>
            <b-td>
              <div
                class="cursor-pointer pl-1 remove-item"
                @click="!busySubscribingProducts && removeProductId(productId)"
              >
                <font-awesome-icon
                  icon="trash"
                />
              </div>
            </b-td>
          </b-tr>
          <!---->
          <!-- Totals -->
          <!---->
        </b-tbody>
        <b-tfoot>
          <b-tr>
            <b-td
              class="text-right"
              variant="secondary"
            >
              {{ $t('subscriptionConfirmation.totalCost') }}
            </b-td>
            <b-td
              class="text-right"
              variant="secondary"
            >
              {{ totalPrice }}
            </b-td>
            <b-td
              variant="secondary"
            />
          </b-tr>
        </b-tfoot>
      </b-table-simple>

      <template v-if="balanceAfterSubscribing < 0">
        <b-alert
          variant="danger"
          show
        >
          {{ $t('subscriptionConfirmation.notEnoughBalance') }}
        </b-alert>
      </template>
      <template v-else>
        <!-- eslint-disable vue/no-v-html -->
        <small
          class="text-muted"
          v-html="$t('subscriptionConfirmation.bySubscribingToTheseProducts', {totalPrice, userBalance})"
        />
        <!-- eslint-enable vue/no-v-html -->
      </template>

      <b-table-simple class="no-borders">
        <b-tbody>
          <b-tr>
            <b-td class="text-right">
              <small class="text-muted">
                {{ $t('subscriptionConfirmation.currentFlexPoints') }}
              </small>
            </b-td>
            <b-td
              class="text-right"
            >
              <small class="text-muted">
                {{ userBalance }}
              </small>
            </b-td>
            <b-td />
          </b-tr>
          <b-tr>
            <b-td class="text-right pt-0">
              <small class="text-muted">
                {{ $t('subscriptionConfirmation.remainingFlexPoints') }}
              </small>
            </b-td>
            <b-td
              class="text-right pt-0"
            >
              <small
                :class="balanceAfterSubscribing < 0 ? 'negative-value' : 'text-muted'"
              >
                {{ balanceAfterSubscribing }}
              </small>
            </b-td>
            <b-td>
              <template v-if="balanceAfterSubscribing < 0">
                <font-awesome-icon
                  icon="exclamation-triangle"
                  class="exclamation-triangle"
                />
              </template>
            </b-td>
          </b-tr>
        </b-tbody>
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
          {{ $t('subscriptionConfirmation.buttonCancel') }}
        </b-button>
        <b-button
          :disabled="isSubscribeButtonDisabled"
          size="sm"
          variant="success"
          @click="subscribe"
        >
          {{ $t('subscriptionConfirmation.buttonOk') }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SubscriptionConfirmation',
  computed: {
    ...mapGetters({
      userBalance: 'auth/userBalance',
      busySubscribingProducts: 'products/busySubscribingProducts',
      allProducts: 'products/allProducts',
      selectedProductsIds: 'products/selectedProductsIds',
    }),
    totalPrice() {
      return this.allProducts
        .filter((product) => this.selectedProductsIds.includes(product.id))
        .reduce((acc, val) => acc + val.price, 0);
    },
    balanceAfterSubscribing() {
      return this.userBalance - this.totalPrice;
    },
    isSubscribeButtonDisabled() {
      return this.busySubscribingProducts || this.balanceAfterSubscribing < 0;
    },
  },
  methods: {
    ...mapActions({
      subscribeProducts: 'products/subscribeProducts',
      toggleProductSelection: 'products/toggleProductSelection',
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
      this.toggleProductSelection(productId);
      // Last one?
      if (!this.selectedProductsIds.length) {
        this.closeModal();
      }
    },
    productFromId(productId) {
      return this.allProducts.find((p) => p.id === productId);
    },
    async subscribe() {
      await this.subscribeProducts(this.selectedProductsIds);
      if (!this.selectedProductsIds.length) {
        this.closeModal();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.remove-item {
  &:hover {
    color: var(--accent-color);
  }
}

.negative-value {
  color: var(--accent-color);
}

.exclamation-triangle {
  color: var(--accent-color);
}

.no-borders {
  tbody, tr, td {
    border: none;
    padding: 0.2rem;
  }
}
</style>
