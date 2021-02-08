import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';

import NavBar from '@/components/NavBar.vue';

describe('NavBar', () => {
  it('renders login text if the user is not signed in', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(BootstrapVue);

    const componentOptions = {
      localVue,
    };

    componentOptions.store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          getters: {
            isAuthenticated: () => false,
            signInPopoverIsOpen: () => false,
          },
        },
      },
    });

    const wrapper = mount(NavBar, componentOptions);

    // check that "login" is shown
    const loginNavLinkText = wrapper
      .findAll('.nav-link')
      .filter((wrapper) => wrapper.text() === 'login')
      .at(0)
      .text();

    expect(loginNavLinkText).toEqual('login')
  })
  it('renders logout text if the user is signed in', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(BootstrapVue);

    const componentOptions = {
      localVue,
    };

    componentOptions.store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          getters: {
            isAuthenticated: () => true,
            signInPopoverIsOpen: () => false,
          },
        },
      },
    });

    const wrapper = mount(NavBar, componentOptions);

    // check that "logout" is shown
    const logoutNavLinkText = wrapper
      .findAll('.nav-link')
      .filter((wrapper) => wrapper.text() === 'logout')
      .at(0)
      .text();

    expect(logoutNavLinkText).toEqual('logout')
  })
})
