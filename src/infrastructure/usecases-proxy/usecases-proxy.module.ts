import { DynamicModule, Module } from '@nestjs/common';
import { addCarUseCases } from '../../usecases/car/addCar.usecases';
import { deleteCarUseCases } from '../../usecases/car/deleteCar.usecases';
import { GetCarUseCases } from '../../usecases/car/getCar.usecases';
import { getCarsUseCases } from '../../usecases/car/getCars.usecases';
import { updateCarUseCases } from '../../usecases/car/updateCar.usecases';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseCarRepository } from '../repositories/car.repository';
import { UseCaseProxy } from './usecases-proxy';

@Module({
    imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
    static GET_CAR_USECASES_PROXY = 'getCarUsecasesProxy';
    static GET_CARS_USECASES_PROXY = 'getCarsUsecasesProxy';
    static POST_CAR_USECASES_PROXY = 'postCarUsecasesProxy';
    static DELETE_CAR_USECASES_PROXY = 'deleteCarUsecasesProxy';
    static PUT_CAR_USECASES_PROXY = 'putCarUsecasesProxy';

    static register(): DynamicModule {
        return {
            module: UsecasesProxyModule,
            providers: [
                {
                    inject: [DatabaseCarRepository],
                    provide: UsecasesProxyModule.GET_CAR_USECASES_PROXY,
                    useFactory: (CarRepository: DatabaseCarRepository) => new UseCaseProxy(new GetCarUseCases(CarRepository)),
                },
                {
                    inject: [DatabaseCarRepository],
                    provide: UsecasesProxyModule.GET_CARS_USECASES_PROXY,
                    useFactory: (CarRepository: DatabaseCarRepository) =>
                        new UseCaseProxy(new getCarsUseCases(CarRepository)),
                },
                {
                    inject: [LoggerService, DatabaseCarRepository],
                    provide: UsecasesProxyModule.POST_CAR_USECASES_PROXY,
                    useFactory: (logger: LoggerService, CarRepository: DatabaseCarRepository) =>
                        new UseCaseProxy(new addCarUseCases(logger, CarRepository)),
                },
                {
                    inject: [LoggerService, DatabaseCarRepository],
                    provide: UsecasesProxyModule.PUT_CAR_USECASES_PROXY,
                    useFactory: (logger: LoggerService, CarRepository: DatabaseCarRepository) =>
                        new UseCaseProxy(new updateCarUseCases(logger, CarRepository)),
                },
                {
                    inject: [LoggerService, DatabaseCarRepository],
                    provide: UsecasesProxyModule.DELETE_CAR_USECASES_PROXY,
                    useFactory: (logger: LoggerService, CarRepository: DatabaseCarRepository) =>
                        new UseCaseProxy(new deleteCarUseCases(logger, CarRepository)),
                },
            ],
            exports: [
                UsecasesProxyModule.GET_CAR_USECASES_PROXY,
                UsecasesProxyModule.GET_CARS_USECASES_PROXY,
                UsecasesProxyModule.POST_CAR_USECASES_PROXY,
                UsecasesProxyModule.PUT_CAR_USECASES_PROXY,
                UsecasesProxyModule.DELETE_CAR_USECASES_PROXY,
            ],
        };
    }
}