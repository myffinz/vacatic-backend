import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async selectAllHistory() {
    try {
      const history = await this.prisma.history.findMany();
      if (!history) throw new NotFoundException('No history found');
      return history;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('No history found');
    }
  }

  async selectHistoryById(historyId) {
    try {
      const history = await this.prisma.history.findFirst({
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
      return history;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('No history found');
    }
  }

  async selectHistoryByMemberId(memberId) {
    try {
      const history = await this.prisma.history.findMany({
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
      return history;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('No history found');
    }
  }

}
