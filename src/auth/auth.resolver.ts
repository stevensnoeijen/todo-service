import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { LoginEntity } from './login.entity';
import { AuthService } from './auth.service';

@Resolver(() => LoginEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginEntity)
  async login(@Args('email', { type: () => String }) email: string) {
    return this.authService.login(email);
  }
}
