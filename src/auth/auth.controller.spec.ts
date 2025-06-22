// src/auth/auth.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn().mockImplementation((dto) => ({
      message: 'User registered successfully',
      token: 'mock-token',
      user: { id: 'user-id', ...dto, password: undefined },
    })),
    login: jest.fn().mockImplementation((dto) => ({
      message: 'Login successful',
      token: 'mock-token',
      user: { id: 'user-id', email: dto.email, password: undefined },
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should register a new user', async () => {
    const dto = { name: 'Test', email: 'test@example.com', password: 'pass' };
    const result = await controller.register(dto);

    expect(result.message).toBe('User registered successfully');
    expect(result.token).toBeDefined();
    expect(authService.register).toHaveBeenCalledWith(dto);
  });

  it('should login a user', async () => {
    const dto = { email: 'test@example.com', password: 'pass' };
    const result = await controller.login(dto);

    expect(result.message).toBe('Login successful');
    expect(result.token).toBeDefined();
    expect(authService.login).toHaveBeenCalledWith(dto);
  });

  it('should return protected route data', () => {
    const mockRequest = { user: { id: 'user-id', email: 'test@example.com' } };
    const result = controller.getProtected(mockRequest as any);

    expect(result).toEqual({
      message: 'Access granted',
      user: mockRequest.user,
    });
  });
});
