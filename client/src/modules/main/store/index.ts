import {StoreOptions} from "vuex";
import generateActions from "@/services/functions/generateActions";
import {AppActions} from "@/modules/main/store/actions";
import generateMutations from "@/services/functions/generateMutations";
import {AppMutations} from "@/modules/main/store/mutations";

const module:StoreOptions<AppState> = {
  state: {
    authenticated:false
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated
    }
  }
};

generateActions(module, AppActions);
generateMutations(module, AppMutations);

export default module;
