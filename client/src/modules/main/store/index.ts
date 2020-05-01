import {StoreOptions} from "vuex";
import generateActions from "@/services/functions/generateActions";
import {AppActions} from "@/modules/main/store/actions";

const module:StoreOptions<AppState> = {
  state: {
    authenticated:false
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated
    }
  },
  mutations: {
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
    }
  },
  actions: {

  }
};

generateActions(module, AppActions);

export default module;
