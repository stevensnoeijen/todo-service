import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      username: 'steven',
    },
  ] satisfies UserEntity[];

  async findOne(username: string): Promise<UserEntity | null> {
    return this.users.find((user) => user.username === username);
  }
}
