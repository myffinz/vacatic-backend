import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class MemberEditDto {
    @IsNotEmpty()
    @IsString()
    first_name: string

    @IsNotEmpty()
    @IsString()
    last_name: string

    @IsNotEmpty()
    @IsEmail()
    email:  string

    @IsNotEmpty()
    @IsString()
    phone: string
}