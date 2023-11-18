import {Controller, Get, Inject, Param, ParseIntPipe} from "@nestjs/common";
import {ApiExtraModels, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UsecasesProxyModule} from "../../usecases-proxy/usecases-proxy.module";
import {UseCaseProxy} from "../../usecases-proxy/usecases-proxy";
import {addCarUseCases, deleteCarUseCases, getCarsUseCases, getCarUseCases, updateCarUseCases} from "../../../usecases";
import {CarM} from "../../../domain/model/car";

@Controller('car')
@ApiTags('car')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels()
export class CarController {
    constructor(
        @Inject(UsecasesProxyModule.POST_CAR_USECASES_PROXY)
        private readonly addCarUsecaseProxy: UseCaseProxy<addCarUseCases>,
        @Inject(UsecasesProxyModule.GET_CARS_USECASES_PROXY)
        private readonly getAllCarsUsecaseProxy: UseCaseProxy<getCarsUseCases>,
        @Inject(UsecasesProxyModule.GET_CAR_USECASES_PROXY)
        private readonly getCarUsecaseProxy: UseCaseProxy<getCarUseCases>,
        @Inject(UsecasesProxyModule.PUT_CAR_USECASES_PROXY)
        private readonly updateCarUsecaseProxy: UseCaseProxy<updateCarUseCases>,
        @Inject(UsecasesProxyModule.DELETE_CAR_USECASES_PROXY)
        private readonly deleteCarUsecaseProxy: UseCaseProxy<deleteCarUseCases>
    ) {}

    @Get(':id')
    async getCar(@Param('id', ParseIntPipe) id: number) {
        return await this.getCarUsecaseProxy.getInstance().execute(id);
    }

    @Get()
    async getAllCars(): Promise<CarM[]> {
        return this.getAllCarsUsecaseProxy.getInstance().execute();
    }
}
