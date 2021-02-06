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

function getLocalTokens() {
  if (!storage) {
    return {};
  }
  return {
    accessToken: storage.getItem('access-token') || '',
    refreshToken: storage.getItem('refresh-token') || '',
  };
}

// function setLocalTokensAndUpdateRequestHeader(tokens) {
//   // TODO: move from local storage to cookies
//   const { accessToken, refreshToken } = tokens;
//   if (accessToken) {
//     // updateRequestHeaders(accessToken);
//     if (storage) {
//       storage.setItem('access-token', accessToken);
//     }
//   }
//   if (refreshToken) {
//     if (storage) {
//       storage.setItem('refresh-token', refreshToken);
//     }
//   }
// }

function clearLocalTokensAndUpdateRequestHeader() {
  // TODO: move from local storage to cookies
  if (storage) {
    storage.removeItem('access-token');
    storage.removeItem('refresh-token');
  }
  // updateRequestHeaders();
}

const initialState = () => ({
  status: '',
  accessToken: getLocalTokens().accessToken,
  refreshToken: getLocalTokens().refreshToken,
  refreshTokenPromise: undefined,
});

const getters = {
  isAuthenticated: (state) => !!state.accessToken,
  accessToken: (state) => state.accessToken, // needed for upload of impulzes
  isSigningOut: (state) => state.status === STATUS.SIGNING_OUT,
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
  AUTH_SUCCESS: (state, tokens) => {
    state.status = STATUS.SIGNED_IN;
    state.accessToken = tokens.accessToken;
    state.refreshToken = tokens.refreshToken;
  },
  AUTH_SET_ACCESS_TOKEN_FOR_JOURNEY_ACCESS: (state, token) => {
    state.accessToken = token;
  },
  AUTH_ERROR: (state) => {
    state.status = STATUS.ERROR;
  },
  AUTH_SIGNING_OUT: (state) => {
    state.status = STATUS.SIGNING_OUT;
    state.refreshToken = '';
  },
  AUTH_SET_REFRESH_TOKEN_PROMISE: (state, payload) => {
    state.refreshTokenPromise = payload;
  },
};

const actions = {
  // eslint-disable-next-line no-shadow
  async initialize({ dispatch, getters }) {
    const tokens = getLocalTokens();
    if (tokens.refreshToken) {
      Vue.prototype.$log.debug('DEBUG 20190701: refresh token exists, will request a new access token');
      // await new Promise(resolve => setTimeout(resolve, 10000));
      await dispatch('refreshTokenAndFetchAccount');
      Vue.prototype.$log.debug('DEBUG 20190701: got new access token and fetched account, will now continue');
      // updateRequestHeaders(tokens.accessToken); // update or delete the Authorization
      if (getters.isAuthenticated) {
        // await new Promise(resolve => setTimeout(resolve, 10000));
        dispatch('authenticated', tokens);
      } else {
        const keepInSameRoute = true;
        dispatch('signOut', { keepInSameRoute });
      }
    } else {
      Vue.prototype.$log.debug('DEBUG 20190701: no refreshToken; sign out');
      const keepInSameRoute = true;
      dispatch('signOut', { keepInSameRoute });
    }
    // No need to fetch the account here, as it is done on main.js the first time
  },
  injectRouter(_, routerParam) {
    router = routerParam;
  },
  authenticated({ commit, dispatch }, tokens) {
    Vue.prototype.$log.debug('Authenticated.');
    commit('AUTH_SUCCESS', tokens);
    // PushNotification.signedIn();
    dispatch('translation/fetchTranslationsAfterLogin', null, { root: true });
  },
  setAccessTokenForJourneyAccess({ commit }, token) {
    commit('AUTH_SET_ACCESS_TOKEN_FOR_JOURNEY_ACCESS', token);
  },
  // eslint-disable-next-line no-shadow
  signIn: async ({ commit, dispatch }, payload) => {
    // context: {dispatch: ƒ, commit: ƒ, getters: {…}, state: {…}, rootGetters: {…}, …}
    // payload: {user: {…}, requestOptions: {…}}
    commit('AUTH_REQUEST');
    try {
      const response = await Vue.prototype.$http.get(`/api/users/${payload.userId}`);
      debugger;
      dispatch('authenticated', response);
      // dispatch('global/userSignedIn', null, { root: true });
    } catch (error) {
      Vue.prototype.$log.warn('Error signing in:', error);
      clearLocalTokensAndUpdateRequestHeader(); // if the request fails, remove user tokens
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
      if ('Authorization' in Vue.prototype.$http.defaults.headers.common) {
        await Vue.prototype.$http.delete('/auth/logout', { cancelToken: null });
      } else {
        // HTTP has no Authorization headers; skip the sign out server-side
      }
    } catch (error) {
      Vue.prototype.$log.error(error);
    } finally {
      clearLocalTokensAndUpdateRequestHeader(); // remove user tokens
      commit('RESET_STORE');
      // Clear other store modules
      commit('account/RESET_STORE', null, { root: true });
      commit('global/RESET_STORE', null, { root: true });
      commit('socket/RESET_STORE', null, { root: true });
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
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  mutations,
  actions,
};
