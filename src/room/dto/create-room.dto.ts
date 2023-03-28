import { Decimal } from "@prisma/client/runtime";
import { IsArray, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    roomTitle: string

    @IsNotEmpty()
    @IsOptional()
    roomDescription: string

    @IsString()
    @IsNotEmpty()
    roomLocation: string

    @IsString()
    @IsNotEmpty()
    roomType: string

    @IsString()
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

    @IsDecimal()
    @IsNotEmpty()
    roomPricePerNight: Decimal

    // @IsArray()
    // @IsNotEmpty()
    // Booking: string[]
}