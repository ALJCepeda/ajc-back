import {ActionContext, Store} from "vuex";
import {copyInstance} from "@/services/util";

export class Action<
  IPayloadType,
  IResponseType,
  IStoreState,
  IRootState = AppState
> {
  public $store?:Store<IStoreState>;
  public payload?:IPayloadType;
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

  with(payload:IPayloadType): Action<IPayloadType, IResponseType, IStoreState, IRootState> {
    return copyInstance<Action<IPayloadType, IResponseType, IStoreState, IRootState>>(this, { payload })
  }

  _doneCB:Callback<IResponseType>;
  done(cb:Callback<IResponseType>):Action<IPayloadType, IResponseType, IStoreState, IRootState> {
    return copyInstance<Action<IPayloadType, IResponseType, IStoreState, IRootState>>(this, { _doneCB:cb })
  }

  createDispatcher($store?:Store<IStoreState>): (payload:IPayloadType) => Promise<IResponseType> {
    return (payload:IPayloadType) => {
      if(!$store && !this.$store) {
        throw new Error('Unable to dispatch without a store being set');
      }

      return this.transform(payload).then((storeAction) =>  {
        return ($store || this.$store)!.dispatch(storeAction)
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

  $dispatch(payload:IPayloadType, $store?:Store<IStoreState>): Promise<IResponseType> {
    return this.createDispatcher($store)(payload);
  }
}

export class APIAction<
  IAPI extends IEndpoint<IAPI['IRequest'], IAPI['IResponse']>,
  IStoreState
> extends Action<IAPI['IRequest'], IAPI['IResponse'], IStoreState> { }
