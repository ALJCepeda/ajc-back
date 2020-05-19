import {RevertObject} from "@/models/RevertObject";

export type FormOptions<IResourceType extends IEntity> = Partial<Form<IResourceType>>;

export default class Form<IResourceType extends IEntity> {
  id:number | undefined;
  editing:boolean = false;
  editable:boolean = false;
  actions:{ [type:string]:(payload:IResourceType) => Promise<any> } = {};
  state: RevertObject<IResourceType>;
  controls: {
    key:keyof IResourceType,
    label:string,
    type:'text' | 'textarea' | 'date' | 'time' | 'datetime' | 'editor',
    readonly?:boolean,
    hideIfEmpty?:boolean
  }[] = [];

  constructor(initialValues:IResourceType, options?:FormOptions<IResourceType>) {
    this.id = initialValues.id;
    this.state = new RevertObject(initialValues);
    Object.assign(this, options);

    if(!this.editable) {
      this.editing = false;
    }
  }

  addAction(type:string, handler:(payload:IResourceType) => Promise<any>) {
    this.actions[type] = handler;
  }

  commit(data?:IResourceType) {
    this.state.commit(data);
  }

  cancel() {
    this.state.reset();
    this.editing = false;
  }

  isDirty():boolean {
    return this.state.isDirty();
  }
}
