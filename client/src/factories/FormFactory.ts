import {Store} from "vuex";
import {Action} from "@/models/Action";
import Form, {FormOptions} from "@/models/Form";

type FormWithActionOptions<IStoreState, IPayloadType extends IEntity, IResponseType> = FormOptions<IPayloadType> & {
  storeActions:(form:Form<IPayloadType>) => { [type:string]: Action<IStoreState, IPayloadType, any> }
}

export function withAction<IStoreState, IPayloadType, IResponseType> (
  $store:Store<IStoreState>,
  payload:IPayloadType,
  options:FormWithActionOptions<IStoreState, IPayloadType, IResponseType>
): Form<IPayloadType> {
  const form = new Form<IPayloadType>(payload, options);

  const storeActions = options.storeActions(form);

  Object.entries(storeActions).forEach(([type, action]) => {
    form.addAction(type, action.createDispatcher($store));
  });

  return form;
}

export async function fromAction<IStoreState, IRequestType, ILoadType, IResponseType> (
  $store:Store<IStoreState>,
  action:Action<IStoreState, IRequestType, ILoadType[]>,
  options:FormWithActionOptions<IStoreState, ILoadType, IResponseType>
): Promise<Form<ILoadType>[]> {
  if(!action.payload) {
    throw new Error('Cannot load form without a payload assigned to action. Did you forget to call "with" on the action?');
  }

  const { payload } = await action.transform(action.payload);
  const resp = await action.$dispatch($store, payload);
  return resp.map(entry => withAction($store, entry, options));
}