import {CarRepository} from "../../domain/repositories/carRepository.interface";
import {CarM} from "../../domain/model/car";

export class getCarUseCases {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(id: number): Promise<CarM> {
        return await this.carRepository.findById(id);
    }
}