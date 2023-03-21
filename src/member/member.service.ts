import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberService {
    constructor(private prisma: PrismaService) {}

    async editMember (
        memberId: number,
        dto: EditMemberDto,
    ){
        const member = await this.prisma.member.update({
            where:{
                id: memberId,
            },
            data:{
                ...dto,
            },
        });
        return member;
    }
}
