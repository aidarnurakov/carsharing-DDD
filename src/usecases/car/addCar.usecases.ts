import {CarRepository} from "../../domain/repositories/carRepository.interface";
import {CreateCarDto} from "../../infrastructure/controllers/car/car.dto";
import {CarM} from "../../domain/model/car";

export class addCarUseCases {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(data: CreateCarDto): Promise<CarM> {
        return await this.carRepository.insert(data);
    }
}