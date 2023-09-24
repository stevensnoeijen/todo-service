import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '../../user/user.module';
import { ListModule } from '../../list/list.module';
import { TodoModule } from '../../todo/todo.module';

import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [ConfigModule, PassportModule, UserModule, ListModule, TodoModule],
  controllers: [GoogleController],
  providers: [GoogleStrategy, GoogleService],
})
export class GoogleModule {}
