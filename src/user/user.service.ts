import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { validate as isUUID } from 'uuid';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const toResponse = (user: User) => {
  const { password, ...rest } = user;
  void password;
  return {
    ...rest,
    createdAt: +user.createdAt,
    updatedAt: +user.updatedAt,
  };
};

@Injectable()
export class UserService {
  async findAll() {
    const users = await prisma.user.findMany();
    return users.map(toResponse);
  }

  async findOne(id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return toResponse(user);
  }

  async create(dto: CreateUserDto) {
    const now = new Date();
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    try {
      const user = await prisma.user.create({
        data: {
          login: dto.login,
          password: hashedPassword,
          version: 1,
          createdAt: now,
          updatedAt: now,
        },
      });
      return toResponse(user);
    } catch (e: any) {
      if (e.code === 'P2002' && e.meta?.target?.includes('login')) {
        throw new BadRequestException('Login must be unique');
      }
      throw e;
    }
  }

  async update(id: string, dto: UpdatePasswordDto) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await bcrypt.compare(
      dto.oldPassword,
      user.password,
    );
    if (!isPasswordValid) throw new ForbiddenException('Wrong old password');

    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10);

    const updated = await prisma.user.update({
      where: { id },
      data: {
        password: hashedNewPassword,
        version: user.version + 1,
        updatedAt: new Date(),
      },
    });

    return toResponse(updated);
  }

  async delete(id: string): Promise<void> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    try {
      await prisma.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async getByLogin(login: string) {
    return prisma.user.findUnique({ where: { login } });
  }
}
