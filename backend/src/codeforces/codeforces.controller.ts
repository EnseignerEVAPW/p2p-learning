// codeforces.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { CodeforcesService } from './codeforces.service';

@Controller('codeforces')
export class CodeforcesController {
  constructor(private readonly codeforcesService: CodeforcesService) {}

  @Get('user/:username')
  async getUserInfo(@Param('username') username: string) {
    return this.codeforcesService.getUserInfo(username);
  }
}
