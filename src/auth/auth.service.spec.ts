import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: Repository<User>;

  const mockUser = {
    id: 'abc123',
    name: 'Test User',
    email: 'test@example.com',
    password: '', // placeholder, will set in beforeAll
    isActive: true,
    isDeleted: false,
  };

  const mockUserRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('signed-jwt-token'),
  };

  beforeAll(async () => {
    // Hash password before all tests
    mockUser.password = await bcrypt.hash('password123', 10);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get(getRepositoryToken(User));
  });

  it('should login a user with valid credentials', async () => {
    mockUserRepo.findOne.mockResolvedValue(mockUser);
    (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(true);
    const result = await service.login({
      email: mockUser.email,
      password: 'password123',
    });

    expect(result).toHaveProperty('token');
    expect(mockJwtService.sign).toHaveBeenCalled();
  });

  it('should throw for invalid credentials', async () => {
    mockUserRepo.findOne.mockResolvedValue(mockUser);
    (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(false);

    await expect(
      service.login({ email: mockUser.email, password: 'wrong' }),
    ).rejects.toThrow('Invalid credentials');
  });
});
