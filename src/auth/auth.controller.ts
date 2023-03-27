import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/createMember')
  async createMember(@Body() createMemberDto: AuthDto) {
    return this.authService.registerMember(createMemberDto);
  }
}
