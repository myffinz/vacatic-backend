import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MemberEditDto } from './dto/member-edit.dto';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async editMember(memberId, editMemberDto: MemberEditDto) {
    const member = await this.prisma.member.findFirst(memberId);
    if (!member) throw new NotFoundException();
    console.log(editMemberDto);
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
    const member = await this.prisma.member.findFirst({
      where: {
        first_name: firstName
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        memberIsHost: true,
      },
    });
    return member;
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
    return memberByEmail;
  }

  async selectAllMember() {
    const member = await this.prisma.member.findMany();
    return member;
  }

  async selectAllHost() {
    const host = await this.prisma.member.findMany({
      where: { memberIsHost: true },
    });
    return host;
  }
}
