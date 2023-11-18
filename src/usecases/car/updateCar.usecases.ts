import {CarRepository} from "../../domain/repositories/carRepository.interface";
import {UpdateCarDto} from "../../infrastructure/controllers/car/car.dto";
import {CarM} from "../../domain/model/car";

export class updateCarUseCases {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(id: number, data: UpdateCarDto): Promise<CarM> {
        return await this.carRepository.updateContent(id, data);
    }
}