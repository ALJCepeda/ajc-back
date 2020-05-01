import Vue from "vue";
import Vuex from "vuex";

import main from "@/modules/main/store/index";
import blog from "@/modules/blog/store/index.js";
import timeline from "@/modules/timeline/store/index.ts";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { main, blog, timeline }
});

export default store;
