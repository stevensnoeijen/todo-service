import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { LoginEntity } from './login.entity';
import { AuthService } from './auth.service';

@Resolver((of) => LoginEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => LoginEntity, { name: 'login' })
  async login(@Args('username', { type: () => String }) username: string) {
    return this.authService.login(username);
  }
}
