import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCarDto {
    @IsNotEmpty()
    @IsString()
    brand!: string;

    @IsNotEmpty()
    @IsString()
    model!: string;

    @IsNotEmpty()
    @IsString()
    plateNumber!: string;

    @IsNotEmpty()
    @IsString()
    vinNumber!: string;
}

export class UpdateCarDto {
    @IsString()
    brand?: string;

    @IsString()
    model?: string;

    @IsString()
    plateNumber?: string;

    @IsString()
    vinNumber?: string;
}