import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('blog')
export default class Blog {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  templateURL:string;

  @Column()
  imageURL:string;

  @Column()
  title:string;

  @Column()
  description:string;

  @Column()
  category:string;

  @Column()
  createdOn:Date;
}
