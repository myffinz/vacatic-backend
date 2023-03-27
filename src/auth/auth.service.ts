import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async registerMember(createMemberDto: AuthDto) {
    try {
      const member = await this.prisma.member.create({
        data: {
          first_name: createMemberDto.first_name,
          last_name: createMemberDto.last_name,
          email: createMemberDto.email,
          phone: createMemberDto.phone,
          memberIsHost: false,
        },
      });
      return member;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw err;
    }
  }
}
