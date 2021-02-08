import Vue from 'vue';
import i18next from 'i18next';

// import { localize } from 'vee-validate';
// import VeeValidateLocaleEn from 'vee-validate/dist/locale/en.json';
// import VeeValidateLocaleDe from 'vee-validate/dist/locale/de.json';

// Moment dates locales
require('moment/locale/en-gb');
require('moment/locale/pt');

// import theDictionary from './translationDictionary';

console.log('Vuex Translation module is being created.'); // no access to Vue.prototype.$log here yet

const defaultLocale = 'en-GB';

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

let installed = false;

// function convertShortToLong(language) {
//   switch (language) {
//     case 'en':
//       return 'en-GB';
//     case 'de':
//       return 'de-DE';
//     // case 'fr':
//     //   return 'fr-FR';
//     default:
//       return language;
//   }
// }

// // eslint-disable-next-line no-unused-vars
// function getFirstBrowserLanguage() {
//   const nav = window.navigator;
//   const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
//   let i;
//   let language;
//   let len;
//   let shortLanguage = null;
//
//   // support for HTML 5.1 "navigator.languages"
//   if (Array.isArray(nav.languages)) {
//     Vue.prototype.$log.debug('nav.languages', nav.languages);
//     for (i = 0; i < nav.languages.length; i += 1) {
//       language = nav.languages[i];
//       language = convertShortToLong(language);
//       len = language.length;
//       if (!shortLanguage && len) {
//         shortLanguage = language;
//       }
//       if (language && len > 2) {
//         return language;
//       }
//     }
//   }
//
//   // support for other well known properties in browsers
//   for (i = 0; i < browserLanguagePropertyKeys.length; i += 1) {
//     language = nav[browserLanguagePropertyKeys[i]];
//     Vue.prototype.$log.debug(`language from browserLanguagePropertyKeys, key ${browserLanguagePropertyKeys[i]}`, language);
//     if (!language) {
//       // e.g. on PhantomJS tests
//       return '';
//     }
//     language = convertShortToLong(language);
//     len = language.length;
//     if (!shortLanguage && len) {
//       shortLanguage = language;
//     }
//     if (language && len > 2) {
//       return language;
//     }
//   }
//
//   return shortLanguage;
// }

const initialState = () => ({
  supportedLocales: [
    { name: 'English', short: 'en', code: 'en-GB' },
    { name: 'Português', short: 'pt', code: 'pt-PT' },
    // { name: 'Deutsch', short: 'de', code: 'de-DE' },
    // { name: 'Français', short: 'fr', code: 'fr-FR' },
  ],
  locale: null,
});

const getters = {
  supportedLocales: (state) => state.supportedLocales,
  locale: (state) => state.locale,
};

const mutations = {
  RESET_STORE(state) {
    Vue.prototype.$log.debug('RESET_STORE translation');
    // Called from the account module when signing out
    // Acquire initial state
    const s = initialState();
    Object.keys(s).forEach((key) => {
      state[key] = s[key];
    });
  },
  mutationChangeLang(state, ln) {
    // Vue.prototype.$log.debug(`mutationChangeLang: ${ln}`);
    const localeExists = state.supportedLocales.find((locale) => locale.code === ln);
    // Use this new locale if it exists, or keep the previous if it exists, or use the default.
    state.locale = (localeExists && localeExists.code) || state.locale || defaultLocale;

    if (storage) {
      storage.setItem('locale', state.locale);
    }

    // if (Vue.prototype.$locale) {
    //   Vue.prototype.$locale = state.locale; // vue-i18n
    // }
    i18next.changeLanguage(state.locale);

    switch (state.locale) {
      case 'en-GB':
        // English
        console.log('localizing VeeValidate and Moment to en-GB');
        // localize('en'); // VeeValidate: activate the English locale.
        Vue.prototype.$moment.locale('en-gb');
        break;
      case 'pt-PT':
        // Deutsch
        console.log('localizing VeeValidate and Moment to pt-PT');
        // localize('pt'); // VeeValidate: activate the Portuguese locale.
        Vue.prototype.$moment.locale('pt');
        break;
      // no default
    }
  },
};

const actions = {
  // eslint-disable-next-line no-shadow
  async initialize({ dispatch }) {
    dispatch('changeLang');
  },
  getInitialLanguage({ state }) {
    if (storage) {
      const langFromLocalStorage = storage.getItem('locale');
      Vue.prototype.$log.debug('locale from local storage', langFromLocalStorage);
      if (langFromLocalStorage) {
        return langFromLocalStorage;
      }
    }

    // const langFromBrowser = getFirstBrowserLanguage();
    const langFromBrowser = false; // disabled (fallback to en-GB)
    Vue.prototype.$log.debug('locale from browser', langFromBrowser);
    if (langFromBrowser) {
      const found = state.supportedLocales.find((locale) => locale.code === langFromBrowser);
      if (found) {
        Vue.prototype.$log.debug(`${langFromBrowser} exists. Selecting it.`);
        return langFromBrowser;
      }
    }

    return defaultLocale;
  },

  // eslint-disable-next-line object-curly-newline
  async changeLang({ commit, dispatch }, payload) {
    async function continueAfterInitialSetup(targetLocale) {
      commit('mutationChangeLang', targetLocale);
    }

    if (!installed) {
      installed = true;
      //
      // Form validation translations
      // (made here because it must be done after vee-validate is installed via Vue.use(VeeValidate)
      //
      // Install VeeValidate English and Deutsch locales.
      // localize({
      //   en: VeeValidateLocaleEn,
      //   de: VeeValidateLocaleDe,
      // });

      try {
        const initialLocale = await dispatch('getInitialLanguage');
        await continueAfterInitialSetup(initialLocale);
      } catch (error) {
        Vue.prototype.$log.error(error);
      } finally {
        //
      }
    } else {
      await continueAfterInitialSetup(payload);
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
