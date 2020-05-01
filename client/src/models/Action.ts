import {ActionContext, Store} from "vuex";
import {copyInstance} from "@/services/util";

export class Action<
  IStoreState,
  IPayloadType,
  IResponseType,
  IRootState = AppState
> {
  payload?: IPayloadType;
  public module:string = '';

  constructor(
    public task:string,
    public handler:(context: ActionContext<IStoreState, IRootState>, payload: ActionPayload<IPayloadType>) => Promise<IResponseType>
  ) { }

  get type():string {
    if(!this.module) {
      return this.task;
    }

    return `${this.module}/${this.task}`;
  }

  async transform(payload:IPayloadType):Promise<ActionPayload<IPayloadType>> {
    return {
      type:this.type,
      payload:payload
    };
  }

  with(payload:IPayloadType): Action<IStoreState, IPayloadType, IResponseType, IRootState> {
    return copyInstance<Action<IStoreState, IPayloadType, IResponseType, IRootState>>(this, { payload })
  }

  _doneCB:Callback<IResponseType>;
  done(cb:Callback<IResponseType>):Action<IStoreState, IPayloadType, IResponseType, IRootState> {
    return copyInstance<Action<IStoreState, IPayloadType, IResponseType, IRootState>>(this, { _doneCB:cb })
  }

  createDispatcher($store:Store<IStoreState>): (payload:IPayloadType) => Promise<IResponseType> {
    return (payload:IPayloadType) => {
      return this.transform(payload).then((storeAction) =>  {
        return $store.dispatch(storeAction)
      }).then((result) => {
        if(this._doneCB) {
          this._doneCB(null, result);
        }

        return result;
      }).catch((err) => {
        if(this._doneCB) {
          this._doneCB(err);
        } else {
          throw err;
        }
      });
    };
  }

  $dispatch($store:Store<IStoreState>, payload:IPayloadType): Promise<IResponseType> {
    return this.createDispatcher($store)(payload);
  }
}

export class APIAction<
  IStoreState,
  IAPI extends IEndpoint<IAPI['IRequest'], IAPI['IResponse']>
> extends Action<IStoreState, IAPI['IRequest'], IAPI['IResponse']> { }
