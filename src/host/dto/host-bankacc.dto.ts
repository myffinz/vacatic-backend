import { IsNotEmpty, IsString } from "class-validator";

export class HostBankAccDto {
    @IsNotEmpty()
    @IsString()
    bankAccountNumber: string
}