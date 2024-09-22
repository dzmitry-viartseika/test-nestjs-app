import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser<T extends DeepPartial<UserEntity>>(
    entity: T,
  ): Promise<UserEntity> {
    return this.userRepository.save(entity);
  }

  async findUserById(userId: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ userId });
  }

  async findUserAndCount(params: any): Promise<UserEntity[]> {
    const [items, total] = await this.qb(params).getManyAndCount();

    return {
      items,
      total,
    };
  }

  async updateUserById(params: any): Promise<UserEntity> {
    await this.userRepository.update({ userId: params.userId }, params);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.delete({ userId });
  }
}
