import { Repository } from 'typeorm';
import createMockInstance from 'jest-create-mock-instance';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let userRepository: jest.Mocked<Repository<UserEntity>>;
  let jwtService: jest.Mocked<JwtService>;
  let authService: AuthService;

  beforeEach(() => {
    userRepository = createMockInstance(Repository<UserEntity>);
    jwtService = createMockInstance(JwtService);
    authService = new AuthService(userRepository, jwtService);
  });

  describe('login', () => {
    it('test', () => {
      expect(1).toBe(1);
    });
    // it('should throw error when user doesnt exists', () => {
    //   userRepository.findOneBy.mockResolvedValue(null);

    //   expect(() => authService.login('madjack@pirate.com')).rejects.toThrow(
    //     UnauthorizedException,
    //   );
    // });
  });
});
