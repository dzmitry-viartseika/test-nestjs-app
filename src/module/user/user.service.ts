import * as crypto from 'node:crypto';
import * as argon from 'argon2';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: CreateUserDto): Promise<void> {
    const userExist = await this.userRepository.checkExistUser({
      phone: user.phone,
      login: user.login,
    });
    if (userExist) {
      throw new ConflictException('User already exist');
    }

    const salt = crypto.randomBytes(32);
    const hash = await argon.hash(user.password, { salt });

    await this.userRepository.createUser({
      passwordHash: hash,
      passwordSalt: salt.toString('hex'),
      ...user,
    });
  }

  async findAll(getUserFilterDto: GetUsersFilterDto): Promise<{
    items: UserDto[];
    total: number;
  }> {
    const { items: users, total } =
      await this.userRepository.findUserAndCount(getUserFilterDto);
    const result = users.map((user) => new UserDto(user));
    return { items: result, total };
  }

  findOne(id: string) {
    return this.userRepository.findUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.deleteUser(id)
  }
}
