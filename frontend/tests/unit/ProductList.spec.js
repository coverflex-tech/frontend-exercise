import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';

import ProductList from '@/components/ProductList.vue';

describe('ProductList', () => {
  it('renders the product list with the exact number of existing products', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(BootstrapVue);

    const componentOptions = {
      localVue,
    };

    const products = [
      {},
      {},
      {},
    ]

    componentOptions.store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          getters: {
            userProductsIds: () => [],
          },
        },
        products: {
          namespaced: true,
          getters: {
            busyLoadingProducts: () => false,
            allProducts: () => products,
            selectedProductsIds: () => [],
          },
        },
      },
    });

    const wrapper = mount(ProductList, componentOptions);

    // check that the correct number of product cards is shown
    expect(wrapper.findAll('.product-card').length).toEqual(products.length);
  })
})
