import { Decimal } from "@prisma/client/runtime";
import { IsDate, IsDateString, IsDecimal, IsInt, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

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

    @IsNumber()
    @IsOptional()
    transportCarPerVehiclePrice: number

    @IsISO8601()
    @IsOptional()
    transportCarDateTime: Date

    @IsUUID()
    @IsNotEmpty()
    member_id: string

    @IsUUID()
    @IsNotEmpty()
    room_id: string

}