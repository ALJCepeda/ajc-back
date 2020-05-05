import {Action} from "@/models/Action";
import Form, {FormOptions} from "@/models/Form";

type FormWithActionOptions<IPayloadType extends IEntity, IResponseType, IStoreState> = FormOptions<IPayloadType> & {
  storeActions:(form:Form<IPayloadType>) => { [type:string]: Action<IPayloadType, any, IStoreState> }
}

export function withAction<IPayloadType, IResponseType, IStoreState> (
  payload:IPayloadType,
  options:FormWithActionOptions<IPayloadType, IResponseType, IStoreState>
): Form<IPayloadType> {
  const form = new Form<IPayloadType>(payload, options);

  const storeActions = options.storeActions(form);

  Object.entries(storeActions).forEach(([type, action]) => {
    form.addAction(type, action.createDispatcher());
  });

  return form;
}

export async function fromAction<IRequestType, ILoadType, IResponseType, IStoreState> (
  action:Action<IRequestType, ILoadType[], IStoreState>,
  options:FormWithActionOptions<ILoadType, IResponseType, IStoreState>
): Promise<Form<ILoadType>[]> {
  if(!action.payload) {
    throw new Error('Cannot load form without a payload assigned to action. Did you forget to call "with" on the action?');
  }

  const { payload } = await action.transform(action.payload);
  const resp = await action.$dispatch(payload);
  return resp.map(entry => withAction(entry, options));
}