import {Column, Entity} from "typeorm";
import Log from "./Log";

@Entity('http-log')
export class HTTPLog extends Log {
  @Column({ update:false })
  traceId:string;
}