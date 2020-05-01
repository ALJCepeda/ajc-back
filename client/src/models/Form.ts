import {isDate} from 'moment';

export type FormOptions<IResourceType extends IEntity> = Partial<Form<IResourceType>>;

export default class Form<IResourceType extends IEntity> {
  editing:boolean = false;
  editable:boolean = false;
  actions:{ [type:string]:(payload:IResourceType) => Promise<any> } = {};
  committed: { [key in keyof IResourceType] : IResourceType[key] };
  data: { [key in keyof IResourceType] : IResourceType[key] };
  controls: {
    key:keyof IResourceType,
    label:string,
    type:'text' | 'textarea' | 'date' | 'time' | 'datetime' | 'editor',
    readonly?:boolean,
    hideIfEmpty?:boolean
  }[] = [];

  get id():number | undefined {
    return this.data.id;
  }

  constructor(initialValues:IResourceType, options?:FormOptions<IResourceType>) {
    this.committed = { ...initialValues };
    this.data = initialValues;

    Object.assign(this, options);

    if(!this.editable) {
      this.editing = false;
    }
  }

  isDirty():boolean {
    for(const key in this.committed) {
      if(this.committed.hasOwnProperty(key) && this.data.hasOwnProperty(key)) {
        const committedValue = this.committed[key];
        const dataValue = this.data[key];

        if(isDate(dataValue) && isDate(committedValue)) {
          if(dataValue.toString() !== committedValue.toString()) {
            return true;
          }
        } else if(dataValue !== committedValue) {
          return true;
        }
      }
    }

    return false;
  }

  reset() {
    Object.assign(this.data, this.committed);
  }

  commit(data?:IResourceType) {
    if(data) {
      Object.assign(this.committed, data);
      this.reset();
    } else {
      Object.assign(this.committed, this.data);
    }

  }

  cancel() {
    this.reset();
    this.editing = false;
  }

  addAction(type:string, handler:(payload:IResourceType) => Promise<any>) {
    this.actions[type] = handler;
  }
}
