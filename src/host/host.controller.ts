import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { HostBankAccDto } from './dto/host-bankacc.dto';
import { HostService } from './host.service';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Get('/')
  async getAllHosts() {
    return this.hostService.selectAllHosts();
  }

  @Get('/:hostId')
  async getHostById(@Param('hostId') hostId: string) {
    return this.hostService.selectHostById(hostId);
  }

  @Patch('/:hostId/updateBankAccount')
  async addBankAccount(
    @Param('hostId') hostId: string,
    @Body() updateBankAccount: HostBankAccDto,
  ) {
    return this.hostService.hostUpdateBankAccount(hostId, updateBankAccount);
  }

  @Patch('/:hostId/removeBankAccount')
  async removeBankAccount(@Param('hostId') hostId: string) {
    return this.hostService.hostRemoveBankAccount(hostId);
  }
}
