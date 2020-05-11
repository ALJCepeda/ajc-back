type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface ActionPayload<T> {
  type:string;
  payload:T;
}

interface TimelineModuleState {

}

interface AppState {
  authenticated:boolean;
}

type Callback<T, R = void> = (err:Error | null, resp?:T) => R;