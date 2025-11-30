import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { randomUUID } from 'crypto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): Omit<User, 'password'>[] {
    return this.users.map((user) => {
      const copy = { ...user };
      delete copy.password;
      return copy;
    });
  }

  findOne(id: string): Omit<User, 'password'> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    const copy = { ...user };
    delete copy.password;
    return copy;
  }

  create(dto: CreateUserDto): Omit<User, 'password'> {
    const newUser: User = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    const copy = { ...newUser };
    delete copy.password;
    return copy;
  }

  update(id: string, dto: UpdatePasswordDto): Omit<User, 'password'> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== dto.oldPassword)
      throw new ForbiddenException('Wrong old password');
    user.password = dto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    const copy = { ...user };
    delete copy.password;
    return copy;
  }

  delete(id: string): void {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users.splice(index, 1);
  }
}
