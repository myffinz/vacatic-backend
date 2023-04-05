import { Options } from "@nestjs/common";
import { Decimal } from "@prisma/client/runtime";
import { IsArray, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    roomTitle: string

    @IsString()
    @IsOptional()
    roomDescription: string

    @IsString()
    @IsNotEmpty()
    roomLocation: string

    @IsString()
    @IsNotEmpty()
    roomType: string

    @IsString({each: true})
    @IsArray()
    @IsNotEmpty()
    roomFacility: string[]

    @IsInt()
    @IsNotEmpty()
    roomGuestCount: number

    @IsInt()
    @IsNotEmpty()
    roomBedroomSingle: number

    @IsInt()
    @IsNotEmpty()
    roomBedroomDouble: number

    @IsInt()
    @IsNotEmpty()
    roomRestroomCount: number

    @IsInt()
    @IsNotEmpty()
    roomKitchenCount: number

    @IsString()
    @IsOptional()
    roomImage: string

    @IsDecimal({force_decimal:true, decimal_digits: '2', locale:'en-US'})
    @IsNotEmpty()
    roomPricePerNight: Decimal

    // @IsArray()
    // @IsNotEmpty()
    // Booking: string[]
}