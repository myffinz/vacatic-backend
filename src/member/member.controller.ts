import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MemberEditDto } from './dto/member-edit.dto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/')
  async getAllMembers() {
    return this.memberService.selectAllMember();
  }

  @Get('hosts')
  async getAllHosts() {
    return this.memberService.selectAllHost();
  }

  @Get('getMemberByEmail/:email')
  async getMemberByEmail(@Param('email') email: string) {
    return this.memberService.selectMemberByEmail(email);
  }

  @Get('getMemberByUUID/:memberId')
  async getMemberByUUID(@Param('memberId') memberId: string) {
    return this.memberService.selectMemberByUUID(memberId);
  }

  @Get('getMemberByName/:firstName')
  async getMemberByName(@Param('firstName') firstName: string) {
    return this.memberService.selectMemberByName(firstName);
  }

  @Patch('editMember/:memberId')
  async editMember(
    @Param('memberId') memberId: string,
    @Body() editMemberDto: MemberEditDto,
  ) {
    return this.memberService.editMember(memberId, editMemberDto);
  }

  @Patch('setMemberToHost/:memberId')
  async setMemberToHost(@Param('memberId') memberId: string) {
    return this.memberService.setMemberToHost(memberId);
  }

  @Patch('setHostToMember/:memberId')
  async setHostToMember(@Param('memberId') memberId: string) {
    return this.memberService.setHostToMember(memberId);
  }
}
