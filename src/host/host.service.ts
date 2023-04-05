import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HostBankAccDto } from './dto/host-bankacc.dto';

@Injectable()
export class HostService {
  constructor(private prisma: PrismaService) {}

  async selectAllHosts() {
    const hosts = await this.prisma.host.findMany({
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
    if (!hosts) {
      throw new Error('No hosts found');
    }
    return hosts;
  }

  async selectHostById(hostId) {
    const host = await this.prisma.host.findFirst({
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
    if (!host) {
      throw new NotFoundException("This Host Doesn't Exist");
    }
    return host;
  }

  async hostUpdateBankAccount(hostId, hostAccountDto: HostBankAccDto) {
    const host = await this.prisma.host.findFirst(hostId);
    if (!host) throw new Error("This Host Doesn't Exist");
    return this.prisma.host.update({
      where: {
        host_id: hostId,
      },
      data: {
        ...hostAccountDto,
      },
    });
  }

  async hostRemoveBankAccount(hostId) {
    const host = await this.prisma.host.findFirst(hostId);
    if (!host) throw new Error("This Host Doesn't Exist");
    return this.prisma.host.update({
      where: {
        host_id: hostId,
      },
      data: {
        bankAccountNumber: null,
      },
    });
  }
}
