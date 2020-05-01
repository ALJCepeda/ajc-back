import {APIAction} from "@/models/Action";
import {AppAPI} from "@/modules/main/store/api";

class AppAction <
  IAPI extends IEndpoint<IAPI['IRequest'], IAPI['IResponse']>
> extends APIAction<AppState, IAPI> {
  module: ''
}

export const AppActions = {
  LOGIN: new AppAction<ILogin>('Login User', async (context, action) => {
    return AppAPI.login(action.payload).then(() => {
      context.commit('setAuthenticated', true);
      return true;
    }).catch((err) => {
      context.commit('setAuthenticated', false);
      throw err;
    });
  }),
  UPDATEAPPSTATE: new AppAction<IFetchAppState>('Update App State', async (context, action) => {
    return AppAPI.fetchAppState(null).then((resp) => {
      console.log(resp);
      context.commit('setAppState', resp);
      return resp;
    })
  })
};