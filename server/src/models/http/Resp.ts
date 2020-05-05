import {Response} from "express";

export class Resp<ResponseType> {
  static is(obj:any):obj is Resp<any> {
    return typeof obj.contentType === 'string';
  }

  public contentType:string='application/json';

  constructor(
    private status:number,
    public body:ResponseType,
    options: Partial<Omit<Resp<ResponseType>,'status' | 'body'>> = {}
  ) {
    Object.assign(this, options);
  }

  send(res:Response) {
    res.contentType(this.contentType).status(this.status).send(this.body).end();
  }
}
