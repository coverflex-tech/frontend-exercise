import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import VueLogger from 'vuejs-logger';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

const isProduction = process.env.NODE_ENV === 'production';

Vue.use(VueLogger, {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true,
});

// Initialize stores
store.dispatch('auth/initialize');
store.dispatch('products/initialize');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
