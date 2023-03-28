import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async selectAllRooms() {
    const rooms = await this.prisma.room.findMany({
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
    return rooms;
  }

  async selectRoomById(roomId) {
    const room = this.prisma.room.findFirst({
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
    return room;
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

  async selectAllRoomsByBookingId(bookingId) {
    return this.prisma.room.findMany({
      where: {
        Booking: {
          some: {
            booking_id: bookingId,
          },
        },
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

  async createRoom(createroomDto: CreateRoomDto, hostId: string) {
    try {
      const room = await this.prisma.room.create({
        data: {
          roomTitle: createroomDto.roomTitle,
          roomDescription: createroomDto.roomDescription,
          roomLocation: createroomDto.roomLocation,
          roomType: createroomDto.roomType,
          roomFacility: createroomDto.roomFacility,
          roomGuestCount: createroomDto.roomGuestCount,
          roomBedroomSingle: createroomDto.roomBedroomSingle,
          roomBedroomDouble: createroomDto.roomBedroomDouble,
          roomRestroomCount: createroomDto.roomRestroomCount,
          roomKitchenCount: createroomDto.roomKitchenCount,
          roomPricePerNight: createroomDto.roomPricePerNight,
          hostHost_id: hostId,
        },
      });
      return room;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Room already exists');
        }
      }
    }
  }

  async updateRoom(roomId, createroomDto: CreateRoomDto) {
    const room = await this.prisma.room.findFirst(roomId);
    if (!room) {
      throw new ForbiddenException('Room does not exist');
    }
    return this.prisma.room.update({
      where: {
        room_id: roomId,
      },
      data: {
        ...createroomDto,
      },
    });
  }

  async deleteRoom(roomId) {
    const room = await this.prisma.room.findFirst(roomId);
    if (!room) {
      throw new ForbiddenException('Room does not exist');
    }
    return this.prisma.room.delete({
      where: {
        room_id: roomId,
      },
    });
  }

  async searchByRoomTitle(roomTitle) {
    return this.prisma.room.findMany({
      where: {
        roomTitle: {
          contains: roomTitle,
        },
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

  async searchByRoomLocation(roomLocation) {
    try {
      return this.prisma.room.findMany({
        where: {
          roomLocation: {
            contains: roomLocation,
          },
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
    } catch (err) {
      throw new ForbiddenException('Room does not exist');
    }
  }
}
