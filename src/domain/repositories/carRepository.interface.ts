import {CarM} from "../model/car";
import {CreateCarDto, UpdateCarDto} from "../../infrastructure/controllers/car/car.dto";

export interface CarRepository {
    insert(car: CreateCarDto): Promise<CarM>;
    findAll(): Promise<CarM[]>;
    findById(id: number): Promise<CarM>;
    updateContent(id: number, data: UpdateCarDto): Promise<CarM>;
    deleteById(id: number): Promise<void>;
 }