import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
    };

    super(options);

    console.log(
      '[JWT STRATEGY] Initialized with secret:',
      process.env.JWT_SECRET,
    );
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(
    payload: JwtPayload,
  ): Promise<{ userId: string; email: string }> {
    console.log('[JWT STRATEGY] Payload:', payload);
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
