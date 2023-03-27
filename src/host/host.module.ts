import { Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';

@Module({
  providers: [HostService],
  controllers: [HostController]
})
export class HostModule {}
