import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';

import messagesEnGb from '@/lang/en_GB.json';
import messagesPtPt from '@/lang/pt_PT.json';

Vue.use(VueI18Next);

i18next.init({
  lng: 'en-GB',
  resources: {
    'en-GB': { translation: messagesEnGb },
    'pt-PT': { translation: messagesPtPt },
  },
});

export default new VueI18Next(i18next);
