import { Request } from '@nestjs/common';
import { JwtUser } from './jwtUser';

export interface JwtRequest extends Request {
  user: JwtUser;
}
