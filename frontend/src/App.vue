<template>
  <div
    id="app"
    class="bg-gradient-red"
  >
    <div class="container-max-width">
      <nav-bar />
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
  methods: {},
};
</script>

<style lang="scss">
@import "assets/_custom.scss";
@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/src/index.scss';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100%;
  background-color: #fff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #333;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--default-color);
  background: linear-gradient(180deg, #f5ebe3, #f5ebe3 16%, #eae0d9 28%, #e6e5e2);

  --default-color: #4e526b;
  --accent-color: #fe685b; /* hsl(5, 99%, 68%) */
  //--accent-color-hsl-c: 5, 99%; /* the base color */
  //--accent-color-hsl-l: 68%; /* the initial lightness */
  //--accent-color-darker: hsl(var(--accent-color-hsl-c), calc(var(--accent-color-hsl-l) - 5%));
}

.bg-gradient-red {
  height: 100vh;
  background: linear-gradient(180deg, #f5ebe3, #f5ebe3 16%, #eae0d9 28%, #e6e5e2);
}

.container-max-width {
  max-width: 1440px;
  margin: 0 auto;
}

.spinner-border {
  color: var(--accent-color);
}
</style>
