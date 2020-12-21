import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { pick } from 'lodash';

export type UserDTO = Pick<User, 'id' | 'username' | 'active'>;

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

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP"
  })
  createdOn?:Date;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updatedOn?:Date;

  toDTO(): UserDTO {
    return pick(this, 'id', 'username', 'active');
  }
}
