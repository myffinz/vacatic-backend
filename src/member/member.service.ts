import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MemberEditDto } from './dto/member-edit.dto';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async editMember(memberId, editMemberDto: MemberEditDto) {
    const member = await this.prisma.member.findFirst(memberId);
    if (!member) throw new NotFoundException();
    return this.prisma.member.update({
      where: {
        member_id: memberId,
      },
      data: {
        ...editMemberDto,
      },
    });
  }

  async setMemberToHost(memberId) {
    const member = await this.prisma.member.findFirst(memberId);
    if (!member) throw new NotFoundException();
    return this.prisma.member.update({
      where: {
        member_id: memberId,
      },
      data: {
        memberIsHost: true,
      },
    });
  }

  async setHostToMember(memberId) {
    const member = await this.prisma.member.findFirst(memberId);
    if (!member) throw new NotFoundException();
    return this.prisma.member.update({
      where: {
        member_id: memberId,
      },
      data: {
        memberIsHost: false,
      },
    });
  }

  async selectMemberByName(firstName) {
    try {
      const member = await this.prisma.member.findFirst({
        where: {
          first_name: firstName,
        },
        select: {
          first_name: true,
          last_name: true,
          email: true,
          phone: true,
          memberIsHost: true,
        },
      });
      if (!member) throw new NotFoundException('Member Not Found');
      return member;
    } catch (err) {
      throw new NotFoundException('Member Not Found');
    }
  }

  async selectMemberByUUID(memberId) {
    const member = await this.prisma.member.findFirst({
      where: {
        member_id: memberId,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        memberIsHost: true,
      },
    });
    if (!member) throw new NotFoundException('Member Not Found');
    return member;
  }

  async selectMemberByEmail(email) {
    const memberByEmail = await this.prisma.member.findUnique({
      where: {
        email: email,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    });
    if (!memberByEmail) throw new NotFoundException('Member Not Found');
    return memberByEmail;
  }

  async selectAllMember() {
    try {
      const member = await this.prisma.member.findMany();
      if (!member) throw new NotFoundException('No members found');
      return member;
    } catch (err) {
      console.log(err);
      throw new NotFoundException('Member Not Found');
    }
  }

  async selectAllHost() {
    const host = await this.prisma.member.findMany({
      where: { memberIsHost: true },
    });
    return host;
  }
}
