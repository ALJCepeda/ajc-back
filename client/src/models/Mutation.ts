import {Store} from "vuex";

export class Mutation<IPayloadType, IStoreState> {
  module:string = '';
  $store?:Store<IStoreState>;

  constructor(
    public id:string,
    public handler:(state:IStoreState, payload:IPayloadType) => void
  ) {}

  get type():string {
    if(!this.module) {
      return this.id;
    }

    return `${this.module}/${this.id}`;
  }

  commit(payload:IPayloadType, context?) {
    if(!context && !this.$store) {
      throw new Error('No store or context provided');
    }

    if(context) {
      context.commit(this.type, payload);
    } else {
      this.$store!.commit(this.type, payload);
    }
  }
}