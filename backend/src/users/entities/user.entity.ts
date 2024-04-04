import { Column, Entity } from "typeorm";

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 25, unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

}
