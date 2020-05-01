type ILogin = IEndpoint<ICredentials, boolean>;
type IFetchAppState = IEndpoint<null, IAppState>;

interface IAppState {
  isAuthenticated: boole
}
