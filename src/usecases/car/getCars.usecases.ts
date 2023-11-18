import { CarM } from '../../domain/model/car';
import { CarRepository } from '../../domain/repositories/carRepository.interface';

export class getCarsUseCases {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(): Promise<CarM[]> {
        return await this.carRepository.findAll();
    }
}