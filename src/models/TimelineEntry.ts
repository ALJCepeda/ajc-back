import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('timeline_entry')
export default class TimelineEntry {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  message:string;

  @Column({
    nullable: true
  })
  link:string;

  @Column()
  label:string;

  @Column()
  createdOn:Date;
}
