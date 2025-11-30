import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    return await this.findUserById(id);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return await this.prisma.user.create({
      data: { ...dto, password: hashedPassword }, //ハッシュ化値で上書き
    });
  }

  async update(userId: number, dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto, password: hashedPassword },
    });
  }

  async delete(userId: number) {
    await this.prisma.user.delete({ where: { id: userId } });
  }

  // IDからユーザーを取得
  private async findUserById(id: number): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }
}
