import {get, post} from "@/services/http";

export const AppAPI = {
  login: post<ILogin>('/login'),
  fetchAppState: get<IFetchAppState>('/state')
};
