import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HostService {
  constructor(private prisma: PrismaService) {}

  async selectAllHosts() {
    return this.prisma.host.findMany({
      select: {
        host_id: true,
        bankAccountNumber: true,
        hostMember_id: true,
        rooms: {
          select: {
            room_id: true,
          },
        },
      },
    });
  }

  async selectHostById(hostId) {
    return this.prisma.host.findFirst({
      where: {
        host_id: hostId,
      },
      select: {
        host_id: true,
        bankAccountNumber: true,
        hostMember_id: true,
        rooms: {
          select: {
            room_id: true,
          },
        },
      },
    });
  }
}
