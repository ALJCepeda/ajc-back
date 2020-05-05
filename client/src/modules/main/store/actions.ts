import {APIAction} from "@/models/Action";
import {AppAPI} from "@/modules/main/store/api";
import {AppMutations} from "@/modules/main/store/mutations";

class AppAction <
  IAPI extends IEndpoint<IAPI['IRequest'], IAPI['IResponse']>
> extends APIAction<IAPI, AppState> {
  module: ''
}

const DefaultUserState:IUserState = {
  isAuthenticated: false
};

export const AppActions = {
  LOGIN: new AppAction<ILogin>('Login User', async (context, action) => {
    return AppAPI.login(action.payload).then(() => {
      AppMutations.setUserState.commit({ isAuthenticated: true });
      return true;
    }).catch((err) => {
      AppMutations.setUserState.commit({ isAuthenticated: false });
      throw err;
    });
  }),
  UPDATEAPPSTATE: new AppAction<IFetchUserState>('Update App State', async () => {
    return AppAPI.fetchAppState(null).then((resp) => {
      if(resp === null) {
        AppMutations.setUserState.commit(DefaultUserState);
      } else {
        AppMutations.setUserState.commit(resp);
      }

      return resp;
    }).catch(err => {
      if(err.response && err.response.status===401) {
        AppMutations.setUserState.commit(DefaultUserState);
        return null;
      }

      throw err;
    });
  })
};