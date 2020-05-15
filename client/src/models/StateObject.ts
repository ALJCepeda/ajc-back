import {isDate} from "moment";

export class StateObject<T extends object> implements IStateObject<T>{
  committed: T;
  data: T;

  constructor(initialValues:T) {
    this.committed = { ...initialValues };
    this.data = initialValues;
  }

  id(): number | undefined {
    // @ts-ignore
    return this.data.id;
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

  commit(data?:T) {
    if(data) {
      Object.assign(this.committed, data);
      this.reset();
    } else {
      Object.assign(this.committed, this.data);
    }
  }
}