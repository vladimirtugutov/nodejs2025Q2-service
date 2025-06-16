import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { validate as isUUID } from 'uuid';

const prisma = new PrismaClient();

const toResponse = (user: User) => {
  const { password, createdAt, updatedAt, ...rest } = user;
  void password;
  return {
    ...rest,
    createdAt: +new Date(createdAt),
    updatedAt: +new Date(updatedAt),
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
    const user = await prisma.user.create({
      data: {
        login: dto.login,
        password: dto.password,
        version: 1,
        createdAt: now,
        updatedAt: now,
      },
    });

    return toResponse(user);
  }

  async update(id: string, dto: UpdatePasswordDto) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== dto.oldPassword)
      throw new ForbiddenException('Wrong old password');

    const updated = await prisma.user.update({
      where: { id },
      data: {
        password: dto.newPassword,
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
