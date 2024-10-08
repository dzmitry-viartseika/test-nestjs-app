import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { CheckExistUserParams, FindUserParams } from './user.types';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findUserAndCount(params: FindUserParams): Promise<{ items: UserEntity[]; total: number }> {
    const [items, total] = await this.qb(params).getManyAndCount();

    return {
      items,
      total,
    };
  }

  async updateUser(id: string, updatedUser: UpdateUserDto): Promise<void> {
    await this.userRepository.update({ userId: id }, updatedUser);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.delete({ userId });
  }

  async checkExistUser(
    params: CheckExistUserParams,
    alias = 'user',
  ): Promise<boolean> {
    const query = this.userRepository.createQueryBuilder(alias);

    query.where('user.login = :login', { login: params.login });
    query.orWhere('user.phone = :phone', { phone: params.phone });
    query.andWhere('user.isDeleted = :isDeleted', { isDeleted: false });

    const result = await query.getOne();
    return !!result;
  }

  qb(
    params: FindUserParams = {},
    alias = 'user',
  ): SelectQueryBuilder<UserEntity> {
    const query = this.userRepository.createQueryBuilder(alias);

    if (params?.userIds?.length) {
      query.andWhere(`${alias}.userId in (:...userIds)`, {
        userIds: params.userIds,
      });
    }

    if (params?.phones?.length) {
      query.andWhere(`${alias}.phone in (:...phones)`, {
        phones: params.phones,
      });
    }

    if (params?.login) {
      query.andWhere(`${alias}.login =:login`, { login: params.login });
    }

    if (params.take) {
      query.take(params.take);
    }
    if (params.skip) {
      query.skip(params.skip);
    }

    return query;
  }
}
