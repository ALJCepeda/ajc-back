type ILogin = IEndpoint<ICredentials, boolean>;
type IFetchUserState = IEndpoint<null, IUserState | null>;

interface IUserState {
  isAuthenticated: boolean
}
