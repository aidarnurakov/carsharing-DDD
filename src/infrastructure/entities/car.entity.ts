import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    brand!: string;

    @Column()
    model!: string;

    @Column({ nullable: true, default: 0 })
    carMileage?: number;

    @Column()
    plateNumber!: string;

    @Column()
    vinNumber!: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;
}