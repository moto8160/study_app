import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
    //JS-オブジェクトの分割代入
    // const email = credentialsDto.email;
    // const password = credentialsDto.password;
    const { email, password } = credentialsDto;

    const user = await this.prisma.user.findFirst({ where: { email } }); //emailをユニークにしないと・・・

    if (!user) {
      throw new NotFoundException('emailに紐づくユーザーなしだよ');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('パスワードがちがう!!!');
    }

    const payload: JwtPayload = { sub: user.id, username: user.name };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
