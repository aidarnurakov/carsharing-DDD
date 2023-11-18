import {CarRepository} from "../../domain/repositories/carRepository.interface";

export class deleteCarUseCases {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(id: number): Promise<void> {
        return await this.carRepository.deleteById(id);
    }
}