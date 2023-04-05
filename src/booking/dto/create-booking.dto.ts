import { Decimal } from "@prisma/client/runtime";
import { IsDate, IsDateString, IsDecimal, IsInt, IsISO8601, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateBookingDto {
    @IsISO8601()
    @IsNotEmpty()
    checkInDate: Date

    @IsISO8601()
    @IsNotEmpty()
    checkOutDate: Date

    @IsInt()
    @IsOptional()
    transportCarVehicleCount: number

    @IsDecimal()
    @IsNotEmpty()
    transportCarPerVehiclePrice: Decimal

    @IsISO8601()
    @IsNotEmpty()
    transportCarDateTime: Date

    @IsUUID()
    @IsNotEmpty()
    member_id: string

    @IsUUID()
    @IsNotEmpty()
    room_id: string

}