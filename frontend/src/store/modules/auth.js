import Vue from 'vue';

console.log('Vuex Auth module is being created.'); // no access to Vue.prototype.$log here yet

// Feature detect + local reference
let storage;
let fail;
let uid;
try {
  uid = new Date();
  (storage = window.localStorage).setItem(uid, uid);
  fail = storage.getItem(uid) !== uid.toString();
  storage.removeItem(uid);
  if (fail) {
    storage = false;
  }
} catch (exception) {
  console.log(`Could not access the local storage: ${exception.name}`);
}
//

let router;

const STATUS = {
  SIGNING_IN: 1,
  SIGNED_IN: 2,
  ERROR: 3,
  SIGNING_OUT: 4,
  SIGNED_OUT: 5,
};

function getLocalStorageData() {
  if (!storage) {
    return {};
  }
  return {
    userId: storage.getItem('user-id') || null,
  };
}

function setLocalStorage({ userId }) {
  if (userId && storage) {
    storage.setItem('user-id', userId);
  }
}

function clearLocalStorage() {
  if (storage) {
    storage.removeItem('user-id');
  }
}

const initialState = () => ({
  status: '',
  userId: getLocalStorageData().userId,
  user: null,
  signInPopoverIsOpen: false,
});

const getters = {
  isAuthenticated: (state) => !!state.user,
  user: (state) => state.user,
  userId: (state) => state.user && state.user.user_id,
  userProductsIds: (state) => state.user && state.user.data && state.user.data.product_ids,
  userBalance: (state) => state.user && state.user.data && state.user.data.balance,
  // accessToken: (state) => state.accessToken, // needed for upload of impulzes
  busySigningIn: (state) => state.status === STATUS.SIGNING_IN,
  busySigningOut: (state) => state.status === STATUS.SIGNING_OUT,
  signInPopoverIsOpen: (state) => state.signInPopoverIsOpen,
};

const mutations = {
  RESET_STORE(state) {
    Vue.prototype.$log.debug('RESET_STORE auth');
    // Called from the account module when signing out
    // Acquire initial state
    const s = initialState();
    Object.keys(s).forEach((key) => {
      state[key] = s[key];
    });
  },
  AUTH_REQUEST: (state) => {
    state.status = STATUS.SIGNING_IN;
  },
  AUTH_SUCCESS: (state, user) => {
    state.status = STATUS.SIGNED_IN;
    state.user = user;
  },
  AUTH_ERROR: (state) => {
    state.status = STATUS.ERROR;
  },
  AUTH_SIGNING_OUT: (state) => {
    state.status = STATUS.SIGNING_OUT;
    state.user = null;
  },
  UPDATE_SIGN_IN_POPOVER_STATUS: (state, status) => {
    state.signInPopoverIsOpen = status;
  },
};

const actions = {
  // eslint-disable-next-line no-shadow
  async initialize({ dispatch }) {
    const localStorageData = getLocalStorageData();
    if (localStorageData.userId) {
      Vue.prototype.$log.debug('User is signed in; refresh data');
      await dispatch('signIn', localStorageData.userId);
    } else {
      Vue.prototype.$log.debug('No user; sign out');
      const keepInSameRoute = true;
      dispatch('signOut', { keepInSameRoute });
    }
    // No need to fetch the account here, as it is done on main.js the first time
  },
  injectRouter(_, routerParam) {
    router = routerParam;
  },
  authenticated({ commit }, user) {
    Vue.prototype.$log.debug('Authenticated.');
    commit('AUTH_SUCCESS', user);
  },
  // eslint-disable-next-line no-shadow
  signIn: async ({ commit, dispatch, rootGetters }, userId) => {
    // context: {dispatch: ƒ, commit: ƒ, getters: {…}, state: {…}, rootGetters: {…}, …}
    // payload: {user: {…}, requestOptions: {…}}
    commit('AUTH_REQUEST');
    try {
      const response = await Vue.prototype.$http.get(`/api/users/${userId}`);
      const STATUS_OK = 200;
      if (response.status !== STATUS_OK) {
        Vue.prototype.$log.warn('Error signing in:', response);
        return null;
      }
      if (!('user' in response.data)) {
        Vue.prototype.$log.warn('Missing "user" in response data:', response.data);
        return null;
      }
      const { user } = response.data;
      setLocalStorage({ userId: user.user_id });
      dispatch('authenticated', user);
      // Are there products? (they are cleared on sign out)
      if (!rootGetters['products/allProducts'].length) {
        dispatch('products/fetchProducts', null, { root: true });
      }
      return user;
    } catch (error) {
      Vue.prototype.$log.warn('Error signing in:', error);
      clearLocalStorage(); // if the request fails, remove user tokens
      commit('AUTH_ERROR', error);
      // reject(error);
      throw error;
    } finally {
      //
    }
  },
  signOut: async ({ commit }, { keepInSameRoute, refresh } = {}) => {
    Vue.prototype.$log.debug('Signing out.');
    commit('AUTH_SIGNING_OUT');
    // PushNotification.signedOut();
    try {
      // if ('Authorization' in Vue.prototype.$http.defaults.headers.common) {
      //   await Vue.prototype.$http.delete('/auth/logout', { cancelToken: null });
      // } else {
      //   // HTTP has no Authorization headers; skip the sign out server-side
      // }
    } catch (error) {
      Vue.prototype.$log.error(error);
    } finally {
      clearLocalStorage();
      commit('RESET_STORE');
      // Clear other store modules
      commit('products/RESET_STORE', null, { root: true });
      if (refresh) {
        Vue.prototype.$log.debug('Sign out and refresh.');
        window.location.reload();
      } else if (!keepInSameRoute && router) {
        // Change route
        router.push({ name: 'SignedOut' });
      }
      // resolve();
    }
  },
  updateSignInPopoverOpenStatus: async ({ commit }, status) => {
    commit('UPDATE_SIGN_IN_POPOVER_STATUS', status);
  },
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  mutations,
  actions,
};
