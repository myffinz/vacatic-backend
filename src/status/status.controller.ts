import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('/BookingStatus/:bookingId')
  async getAllStatus(@Param('bookingId') bookingId: string) {
    return this.statusService.selectStatusByBookingId(bookingId);
  }

  @Get('/RoomStatus/:roomId')
  async getRoomStatus(@Param('roomId') roomId: string) {
    return this.statusService.selectStatusByRoomId(roomId);
  }

  @Patch('/setStatusToBooked/:statusId')
  async setStatusToBooked(@Param('statusId') statusId: string) {
    return this.statusService.setStatusToBooked(statusId);
  }

  @Patch('/setStatusToVacant/:statusId')
  async setStatusToVacant(@Param('statusId') statusId: string) {
    return this.statusService.setStatusToVacant(statusId);
  }

  @Post('/createStatus')
  async createStatus(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.createNewStatus(createStatusDto);
  }
}
