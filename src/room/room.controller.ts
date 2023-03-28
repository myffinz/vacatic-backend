import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('/')
  async getAllRooms() {
    return this.roomService.selectAllRooms();
  }

  @Get('/:roomId')
  async getRoomById(@Param('roomId') roomId: string) {
    return this.roomService.selectRoomById(roomId);
  }

  @Get('roomsByHostId/:hostId')
  async getRoomsByHostId(@Param('hostId') hostId: string) {
    return this.roomService.selectAllRoomsByHostId(hostId);
  }

  @Get('roomsByBookingId/:bookingId')
  async getRoomsByBookingId(@Param('bookingId') bookingId: string) {
    return this.roomService.selectAllRoomsByBookingId(bookingId);
  }

  @Post('/:hostId/createRoom')
  async createRoom(
    @Param('hostId') hostId: string,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return this.roomService.createRoom(createRoomDto, hostId);
  }

  @Patch('/:roomId/updateRoom')
  async updateRoom(@Param('roomId') roomId: string, @Body() updateRoomDto) {
    return this.roomService.updateRoom(roomId, updateRoomDto);
  }
}
