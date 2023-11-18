import {Injectable} from "@nestjs/common";
import {CarRepository} from "../../domain/repositories/carRepository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {Car} from "../entities/car.entity";
import {Repository} from "typeorm";
import {CarM} from "../../domain/model/car";

@Injectable()
export class DatabaseCarRepository implements CarRepository {
    constructor(@InjectRepository(Car) private readonly carEntityRepository: Repository<Car>) {}

    async insert(car: CarM): Promise<CarM> {
        const newCar = await this.carEntityRepository.create(car);
        return this.carEntityRepository.save(newCar);
    }

    async findAll(): Promise<CarM[]> {
        return Promise.resolve([]);
    }

    async findById(id: number): Promise<CarM> {
        return Promise.resolve(undefined);
    }

    async updateContent(id: number, isDone: boolean): Promise<void> {
        await this.carEntityRepository.update(id, )
    }

    async deleteById(id: number): Promise<void> {
        return Promise.resolve(undefined);
    }
}