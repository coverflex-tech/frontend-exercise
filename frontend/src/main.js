import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import VueLogger from 'vuejs-logger';
import VueMoment from 'vue-moment';

import { library as faLibrary } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

Vue.use(VueMoment);

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

//
// Font Awesome Icons
//
/* eslint-disable import/first, import/order */
import {
  faCheck,
  faExclamationTriangle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

// import {
//   faQuestionCircle as farQuestionCircle,
// } from '@fortawesome/free-regular-svg-icons';

/* eslint-enable import/first, import/order */
faLibrary.add(
  faCheck,
  faExclamationTriangle,
  faTrash,
);
//
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
