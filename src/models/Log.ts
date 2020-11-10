import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('log')
export default class Log {
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({ update:false })
  level:string;
  
  @Column({ update:false })
  message:string;
  
  @Column({
    type:'jsonb',
    nullable:true,
    update:false
  })
  data?:JSON;
  
  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn?:Date;
}
