import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditMemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;
}
