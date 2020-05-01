import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('timeline_entry')
export default class TimelineEntry implements ITimelineEntry {
  @PrimaryGeneratedColumn()
  id?:number;

  @Column()
  message:string;

  @Column()
  imageURL:string;

  @Column({
    nullable: true
  })
  labelURL:string;

  @Column()
  label:string;

  @Column()
  when:Date;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP"
  })
  createdOn?:Date;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updatedOn?:Date;
}
