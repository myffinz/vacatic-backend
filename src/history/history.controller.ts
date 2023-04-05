import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('/')
  async getAllHistories() {
    return this.historyService.selectAllHistory();
  }

  @Get('/:historyId')
  async getHistoryById(@Param('historyId') historyId: string) {
    return this.historyService.selectHistoryById(historyId);
  }

  @Get('/member/:memberId')
  async getHistoryByMemberId(@Param('memberId') memberId: string) {
    return this.historyService.selectHistoryByMemberId(memberId);
  }
}
