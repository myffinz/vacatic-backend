import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async selectAllHistory() {
    try {
      const histories = await this.prisma.history.findMany({
        select: {
          history_id: true,
          memberMember_id: true,
          bookingBooking_id: true,
        },
      });
      if (!history) throw new NotFoundException('No history found');
      return histories;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('No history found');
    }
  }

  async selectHistoryById(historyId) {
    try {
      const histories = await this.prisma.history.findFirst({
        where: {
          history_id: historyId,
        },
        select: {
          history_id: true,
          memberMember_id: true,
          bookingBooking_id: true,
        },
      });
      if (!history) throw new NotFoundException('No history found');
      return histories;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('No history found');
    }
  }

  async selectHistoryByMemberId(memberId) {
    try {
      const histories = await this.prisma.history.findMany({
        where: {
          memberMember_id: memberId,
        },
        select: {
          history_id: true,
          memberMember_id: true,
          bookingBooking_id: true,
        },
      });
      if (!history) throw new NotFoundException('No history found');
      return histories;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('No history found');
    }
  }

}
