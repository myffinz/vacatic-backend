import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStatusDto } from './dto/create-status.dto';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}

  async selectStatusByBookingId(bookingId) {
    try {
      const status = await this.prisma.status.findFirst({
        where: {
          bookingBooking_id: bookingId,
        },
        select: {
          status_id: true,
          statusVacancy: true,
          roomRoom_id: true,
          bookingBooking_id: true,
        },
      });
      if (!status)
        throw new NotFoundException(
          'The status of this booking cannot be found',
        );
      return status;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('The status of this booking cannot be found');
    }
  }

  async selectStatusByRoomId(roomId) {
    try {
      const status = await this.prisma.status.findFirst({
        where: {
          roomRoom_id: roomId,
        },
        select: {
          status_id: true,
          statusVacancy: true,
          roomRoom_id: true,
          bookingBooking_id: true,
        },
      });
      if (!status)
        throw new NotFoundException('The status of this room cannot be found');
      return status;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('The status of this room cannot be found');
    }
  }

  async setStatusToBooked(statusId) {
    try {
      const status = await this.prisma.status.update({
        where: {
          status_id: statusId,
        },
        data: {
          statusVacancy: false,
        },
      });
      if (!status) throw new NotFoundException('Invalid Booking ID');
      return status;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('Invalid Booking ID');
    }
  }

  async setStatusToVacant(statusId) {
    try {
      const status = await this.prisma.status.update({
        where: {
          status_id: statusId,
        },
        data: {
          statusVacancy: true,
        },
      });
      if (!status) throw new NotFoundException('Invalid Booking ID');
      return status;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException('Invalid Booking ID');
    }
  }

  async createNewStatus(createStatusDto: CreateStatusDto) {
    try {
      const status = await this.prisma.status.create({
        data: {
          statusVacancy: true,
          roomRoom_id: createStatusDto.room_id,
          bookingBooking_id: createStatusDto.booking_id,
        },
      });
      return status;
    } catch (error) {
      console.log(error.message);
      throw new ForbiddenException(error);
    }
  }
}
