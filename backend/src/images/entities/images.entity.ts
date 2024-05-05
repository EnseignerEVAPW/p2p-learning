/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Image extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP'})
    createdAt: Date;
    
}