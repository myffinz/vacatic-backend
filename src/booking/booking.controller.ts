import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/')
  async getAllBookings() {
    return this.bookingService.selectAllBookings();
  }

  @Get('/:bookingId')
  async getBookingById(@Param('bookingId') bookingId: string) {
    return this.bookingService.selectBookingById(bookingId);
  }

  @Get('/getBookingByMemberId/:memberId')
  async getBookingByMemberId(@Param('memberId') memberId: string) {
    return this.bookingService.selectBookingByMemberId(memberId);
  }

  @Post('/createBooking')
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Patch('/deleteBookingById/:bookingId')
  async deleteBookingById(@Param('bookingId') bookingId: string) {
    return this.bookingService.deleteBookingById(bookingId);
  }
}
