import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async selectAllBookings() {
    const bookings = await this.prisma.booking.findMany({
      select: {
        booking_id: true,
        checkInDate: true,
        checkOutDate: true,
        transportCarVehicleCount: true,
        transportCarPerVehiclePrice: true,
        transportCarDateTime: true,
        member_id: true,
        room_id: true,
        Status: {
          select: {
            status_id: true,
          },
        },
      },
    });
    return bookings;
  }

  async createBooking(createBookingDto: CreateBookingDto) {
    try {
      const booking = await this.prisma.booking.create({
        data: {
          checkInDate: createBookingDto.checkInDate,
          checkOutDate: createBookingDto.checkOutDate,
          transportCarVehicleCount: createBookingDto.transportCarVehicleCount,
          transportCarPerVehiclePrice:
            createBookingDto.transportCarPerVehiclePrice,
          transportCarDateTime: createBookingDto.transportCarDateTime,
          memberMember_id: createBookingDto.member_id,
          roomRoom_id: createBookingDto.room_id,
        },
      });
      return booking;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Booking already exists');
        }
      }
    }
  }

  async selectBookingById(bookingId) {
    try {
      const booking = await this.prisma.booking.findFirst({
        where: {
          booking_id: bookingId,
        },
        select: {
          booking_id: true,
          checkInDate: true,
          checkOutDate: true,
          transportCarVehicleCount: true,
          transportCarPerVehiclePrice: true,
          transportCarDateTime: true,
          member_id: true,
          room_id: true,
          Status: {
            select: {
              status_id: true,
            },
          },
        },
      });
      return booking;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('No booking found');
    }
  }

  async selectBookingByMemberId(memberId) {
    try {
      const booking = await this.prisma.booking.findMany({
        where: {
          memberMember_id: memberId,
        },
        select: {
          booking_id: true,
          checkInDate: true,
          checkOutDate: true,
          transportCarVehicleCount: true,
          transportCarPerVehiclePrice: true,
          transportCarDateTime: true,
          member_id: true,
          room_id: true,
          Status: {
            select: {
              status_id: true,
            },
          },
        },
      });
      return booking;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('No history found');
    }
  }

  async deleteBookingById(bookingId) {
    try {
      const booking = await this.prisma.booking.findFirst(bookingId);
      if (!booking) throw new NotFoundException('No booking found');
      return this.prisma.booking.delete({
        where: {
          booking_id: bookingId,
        },
      });
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('No history found');
    }
  }
}
