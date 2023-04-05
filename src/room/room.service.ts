import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
// import { FilterDto } from './dto/filter.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async selectAllRooms() {
    try {
      const rooms = await this.prisma.room.findMany({
        select: {
          room_id: true,
          roomTitle: true,
          roomDescription: true,
          roomLocation: true,
          roomImage: true,
          roomType: true,
          roomFacility: true,
          roomGuestCount: true,
          roomBedroomSingle: true,
          roomBedroomDouble: true,
          roomRestroomCount: true,
          roomKitchenCount: true,
          roomPricePerNight: true,
          hostHost_id: true,
          Booking: {
            select: {
              booking_id: true,
            },
          },
        },
      });
      if (!rooms) throw new NotFoundException('No rooms found');
      return rooms;
    } catch (err) {
      console.log(err.message);
      throw new NotFoundException('No rooms found');
    }
  }

  async selectRoomById(roomId) {
    try {
      const room = await this.prisma.room.findFirst({
        where: {
          room_id: roomId,
        },
        select: {
          roomTitle: true,
          roomDescription: true,
          roomLocation: true,
          roomImage: true,
          roomType: true,
          roomFacility: true,
          roomGuestCount: true,
          roomBedroomSingle: true,
          roomBedroomDouble: true,
          roomRestroomCount: true,
          roomKitchenCount: true,
          roomPricePerNight: true,
          hostHost_id: true,
          Booking: {
            select: {
              booking_id: true,
            },
          },
        },
      });
      if (!room) throw new NotFoundException('No room found');
      return room;
    } catch (err) {
      console.log(err.message);
      throw new NotFoundException('No room found');
    }
  }

  async selectAllRoomsByHostId(hostId) {
    try {
      const room = await this.prisma.room.findMany({
        where: {
          hostHost_id: hostId,
        },
        select: {
          roomTitle: true,
          roomDescription: true,
          roomLocation: true,
          roomImage: true,
          roomType: true,
          roomFacility: true,
          roomGuestCount: true,
          roomBedroomSingle: true,
          roomBedroomDouble: true,
          roomRestroomCount: true,
          roomKitchenCount: true,
          roomPricePerNight: true,
          hostHost_id: true,
          Booking: {
            select: {
              booking_id: true,
            },
          },
        },
      });
      if (!room) throw new NotFoundException('No rooms found');
      return room;
    } catch (err) {
      console.log(err.message);
      throw new NotFoundException('No room found');
    }
  }

  async selectAllRoomsByBookingId(bookingId) {
    try {
      const rooms = this.prisma.room.findMany({
        where: {
          Booking: {
            some: {
              booking_id: bookingId,
            },
          },
        },
        select: {
          roomTitle: true,
          roomDescription: true,
          roomLocation: true,
          roomImage: true,
          roomType: true,
          roomFacility: true,
          roomGuestCount: true,
          roomBedroomSingle: true,
          roomBedroomDouble: true,
          roomRestroomCount: true,
          roomKitchenCount: true,
          roomPricePerNight: true,
          hostHost_id: true,
          Booking: {
            select: {
              booking_id: true,
            },
          },
        },
      });
      if (!rooms) throw new NotFoundException('No rooms found');
      return rooms;
    } catch (err) {
      console.log(err.message);
      throw new NotFoundException('No room found');
    }
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
      throw new NotFoundException(err);
    }
  }

  async updateRoom(roomId, createroomDto: CreateRoomDto) {
    try {
      const room = await this.prisma.room.findFirst(roomId);
      if (!room) {
        throw new NotFoundException('Room does not exist');
      }
      return this.prisma.room.update({
        where: {
          room_id: roomId,
        },
        data: {
          ...createroomDto,
        },
      });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async deleteRoom(roomId) {
    const room = await this.prisma.room.findFirst(roomId);
    if (!room) {
      throw new NotFoundException('Room does not exist');
    }
    return this.prisma.room.delete({
      where: {
        room_id: roomId,
      },
    });
  }

  async searchByRoomTitle(roomTitle) {
    try {
      const rooms = await this.prisma.room.findMany({
        where: {
          roomTitle: {
            contains: roomTitle,
          },
        },
        select: {
          roomTitle: true,
          roomDescription: true,
          roomLocation: true,
          roomImage: true,
          roomType: true,
          roomFacility: true,
          roomGuestCount: true,
          roomBedroomSingle: true,
          roomBedroomDouble: true,
          roomRestroomCount: true,
          roomKitchenCount: true,
          roomPricePerNight: true,
          hostHost_id: true,
          Booking: {
            select: {
              booking_id: true,
            },
          },
        },
      });
      if (!rooms) throw new NotFoundException('Room does not exist');
      return rooms;
    } catch (err) {
      throw new NotFoundException('No room found');
    }
  }

  //   async searchByFilter(fieldName: string, data: string) {
  //     try {
  //       return this.prisma.room.findMany({
  //         where: {},
  //         select: {
  //           roomTitle: true,
  //           roomDescription: true,
  //           roomLocation: true,
  //           roomImage: true,
  //           roomType: true,
  //           roomFacility: true,
  //           roomGuestCount: true,
  //           roomBedroomSingle: true,
  //           roomBedroomDouble: true,
  //           roomRestroomCount: true,
  //           roomKitchenCount: true,
  //           roomPricePerNight: true,
  //           hostHost_id: true,
  //           Booking: {
  //             select: {
  //               booking_id: true,
  //             },
  //           },
  //         },
  //       });
  //     } catch (err) {
  //       throw new NotFoundException('Room does not exist');
  //     }
  //   }

  async searchByRoomLocation(roomLocation) {
    try {
      return this.prisma.room.findMany({
        where: {
          roomLocation: {
            contains: roomLocation,
          },
        },
        select: {
          roomTitle: true,
          roomDescription: true,
          roomLocation: true,
          roomImage: true,
          roomType: true,
          roomFacility: true,
          roomGuestCount: true,
          roomBedroomSingle: true,
          roomBedroomDouble: true,
          roomRestroomCount: true,
          roomKitchenCount: true,
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
      throw new NotFoundException('No Rooms Found');
    }
  }

  async searchByRoomType(roomType) {
    try {
      return this.prisma.room.findMany({
        where: {
          roomType: {
            contains: roomType,
          },
        },
        select: {
          roomTitle: true,
          roomDescription: true,
          roomLocation: true,
          roomImage: true,
          roomType: true,
          roomFacility: true,
          roomGuestCount: true,
          roomBedroomSingle: true,
          roomBedroomDouble: true,
          roomRestroomCount: true,
          roomKitchenCount: true,
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
      throw new NotFoundException('Room does not exist');
    }
  }

  async searchByRoomFacility(roomFacility: string[]) {
    try {
      return this.prisma.room.findMany({
        where: {
          roomFacility: {
            hasSome: roomFacility,
          },
        },
        select: {
          roomTitle: true,
          roomDescription: true,
          roomLocation: true,
          roomImage: true,
          roomType: true,
          roomFacility: true,
          roomGuestCount: true,
          roomBedroomSingle: true,
          roomBedroomDouble: true,
          roomRestroomCount: true,
          roomKitchenCount: true,
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
      throw new NotFoundException('Room does not exist');
    }
  }
}
