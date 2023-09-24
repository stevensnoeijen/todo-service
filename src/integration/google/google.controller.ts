import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GoogleAuthGuard } from './google-auth.guard';
import { UserEntity } from '../../user/user.entity';
import { GoogleService } from './google.service';

@Controller('integration/google')
export class GoogleController {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly googleService: GoogleService,
  ) {}

  @Get('/link')
  @UseGuards(GoogleAuthGuard)
  async link() {}

  @Get('/callback')
  @UseGuards(GoogleAuthGuard)
  async callback(@Req() req) {
    const user = await this.userRepository.findOneBy({
      email: req.user.email,
    });
    user.googleRefreshToken = req.user.refreshToken;
    await this.userRepository.save(user);

    return 'linked successful';
  }

  @Get('/sync')
  async sync(@Query('email') email: string) {
    const user = await this.userRepository.findOneBy({
      email: email,
    });

    return this.googleService.syncTasks(user);
  }
}
