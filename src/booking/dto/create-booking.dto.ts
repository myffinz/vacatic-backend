import { Decimal } from "@prisma/client/runtime";
import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateBookingDto {
    @IsDate()
    @IsNotEmpty()
    checkInDate: Date

    @IsDate()
    @IsNotEmpty()
    checkOutDate: Date

    @IsInt()
    @IsOptional()
    transportCarVehicleCount: number

    @IsDecimal()
    @IsNotEmpty()
    transportCarPerVehiclePrice: Decimal

    @IsDate()
    @IsNotEmpty()
    transportCarDateTime: Date

    @IsUUID()
    @IsNotEmpty()
    member_id: string

    @IsUUID()
    @IsNotEmpty()
    room_id: string

}