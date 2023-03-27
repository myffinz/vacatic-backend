import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async selectAllRooms() {
    return this.prisma.room.findMany({
      select: {
        room_id: true,
        roomTitle: true,
        roomDescription: true,
        roomPricePerNight: true,
        hostHost_id: true,
        Booking: {
          select: {
            booking_id: true,
          },
        },
      },
    });
  }

  async selectRoomById(roomId) {
    return this.prisma.room.findFirst({
      where: {
        room_id: roomId,
      },
      select: {
        room_id: true,
        roomTitle: true,
        roomDescription: true,
        roomPricePerNight: true,
        hostHost_id: true,
        Booking: {
          select: {
            booking_id: true,
          },
        },
      },
    });
  }

  async selectAllRoomsByHostId(hostId) {
    return this.prisma.room.findMany({
      where: {
        hostHost_id: hostId,
      },
      select: {
        room_id: true,
        roomTitle: true,
        roomDescription: true,
        roomPricePerNight: true,
        hostHost_id: true,
        Booking: {
          select: {
            booking_id: true,
          },
        },
      },
    });
  }
}
