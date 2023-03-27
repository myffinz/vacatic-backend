import { IsBoolean } from "class-validator";

export class MemberToHostDto {

    @IsBoolean()
    memberIsHost: boolean    

}