import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import VueLogger from 'vuejs-logger';
import moment from 'moment';
import VueMoment from 'vue-moment';

import { library as faLibrary } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import i18n from './i18n-setup';

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

Vue.use(VueMoment, {
  moment, // needed to use the localization
});

// Initialize stores
store.dispatch('translation/initialize');
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
  i18n,
  render: (h) => h(App),
}).$mount('#app');
