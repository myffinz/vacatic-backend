import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MemberModule } from './member/member.module';
import { RoomModule } from './room/room.module';
import { HostModule } from './host/host.module';
import { BookingModule } from './booking/booking.module';
import { HistoryModule } from './history/history.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    MemberModule,
    RoomModule,
    HostModule,
    BookingModule,
    HistoryModule,
    StatusModule,
  ],
})
export class AppModule {}
