import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import products from './modules/products';
import translation from './modules/translation';

Vue.use(Vuex);

console.log('Creating Vuex store with namespaced modules.');

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    products,
    translation,
  },
});
