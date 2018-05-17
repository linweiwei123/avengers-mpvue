import Vue from "vue";
import Vuex from "vuex";
import demo from './modules/demo';
import viewalive from './modules/viewalive';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    demo,
    viewalive
  }
});

export default store;
