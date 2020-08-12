import { Mutation } from '@/models/Mutation';

class AppMutation<IPayloadType> extends Mutation<IPayloadType, AppState> {}

export const AppMutations = {
  setUserState: new AppMutation<IUserState>('Set user state', (state, payload) => {
    state.authenticated = payload.isAuthenticated;
  })
};
