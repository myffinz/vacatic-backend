import { Controller, Get, Param } from '@nestjs/common';
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
}

