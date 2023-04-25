import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateStatusDto {
    @IsNotEmpty()
    @IsUUID()
    booking_id: string

    @IsNotEmpty()
    @IsUUID()
    room_id: string
}