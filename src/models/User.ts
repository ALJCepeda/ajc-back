import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  username:string;

  @Column()
  password:string;

  @Column()
  active:boolean;

  @Column()
  createdOn:Date;
}
