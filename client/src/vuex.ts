import Vue from 'vue';
import Vuex from 'vuex';

import main from '@/modules/main/store/index';
import blog from '@/modules/blog/store/index.js';
import timeline from '@/modules/timeline/store/index.ts';
import { AppActions } from '@/modules/main/store/actions';
import { AppMutations } from '@/modules/main/store/mutations';
import { TimelineActions } from '@/modules/timeline/store/actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { main, blog, timeline }
});

[
  AppActions,
  AppMutations,
  TimelineActions
].forEach((set) => {
  const funcs = Object.values(set);
  funcs.forEach(func => func.$store = store);
});

export default store;
