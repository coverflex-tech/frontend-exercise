import Vue from 'vue';

console.log('Vuex Products module is being created.'); // no access to Vue.prototype.$log here yet

const initialState = () => ({
  busyLoadingProducts: false,
  busySubscribingProducts: false,
  products: [],
});

const getters = {
  busyLoadingProducts: (state) => state.busyLoadingProducts,
  busySubscribingProducts: (state) => state.busySubscribingProducts,
  allProducts: (state) => state.products,
};

const mutations = {
  RESET_STORE(state) {
    Vue.prototype.$log.debug('RESET_STORE products');
    // Called from the auth module when signing out
    // Acquire initial state
    const s = initialState();
    Object.keys(s).forEach((key) => {
      state[key] = s[key];
    });
  },
  SET_BUSY_LOADING_PRODUCTS: (state, status) => {
    state.busyLoadingProducts = status;
  },
  SET_BUSY_SUBSCRIBING_PRODUCTS: (state, status) => {
    state.busySubscribingProducts = status;
  },
  SET_PRODUCTS: (state, products) => {
    state.products = products;
  },
};

const actions = {
  // eslint-disable-next-line no-shadow
  async initialize({ dispatch }) {
    await dispatch('fetchProducts');
  },
  // eslint-disable-next-line no-shadow
  fetchProducts: async ({ commit }) => {
    // context: {dispatch: ƒ, commit: ƒ, getters: {…}, state: {…}, rootGetters: {…}, …}
    // payload: {user: {…}, requestOptions: {…}}
    try {
      commit('SET_BUSY_LOADING_PRODUCTS', true);
      const response = await Vue.prototype.$http.get('/api/products');
      if (response && response.data && response.data.products) {
        commit('SET_PRODUCTS', response.data.products);
      }
    } catch (error) {
      console.error('fetchProducts: could not fetch products:', error);
    } finally {
      commit('SET_BUSY_LOADING_PRODUCTS', false);
    }
  },
  subscribeProducts: async ({ commit, dispatch, rootGetters }, productIds) => {
    try {
      commit('SET_BUSY_SUBSCRIBING_PRODUCTS', true);
      // input {"order": {"items": ["product-1", "product-2"], "user_id": "johndoe"}}
      // output 200 {"order": {"order_id": "123", "data": {"items": [...], "total": 500}}}
      // output 400 {"error": "products_not_found"}
      // output 400 {"error": "products_already_purchased"}
      // output 400 {"error": "insufficient_balance"}
      const userId = rootGetters['auth/userId'];
      const postData = {
        order: {
          items: productIds,
          user_id: userId,
        },
      };
      const response = await Vue.prototype.$http.post('/api/orders', postData);
      if (response && response.data && response.data.order) {
        // Update user
        dispatch('auth/signIn', userId, { root: true });
        return true;
      }
    } catch (error) {
      console.error('fetchProducts: could not fetch products:', error);
      return false;
    } finally {
      commit('SET_BUSY_SUBSCRIBING_PRODUCTS', false);
    }
    return false;
  },
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  mutations,
  actions,
};
