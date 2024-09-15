import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UserDto {
  @ApiProperty({
    description: 'User UUID',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'User phone number',
    required: true,
    type: String,
  })
  @Expose()
  phone: string;

  @ApiProperty({
    description: 'User firstName',
    required: true,
    type: String,
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    description: 'User lastName',
    required: true,
    type: String,
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    description: 'User middleName',
    required: true,
    type: String,
  })
  @Expose()
  middleName: string;

  @ApiProperty({
    description: 'User email address',
    required: true,
    type: String,
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'User balance',
    type: String,
  })
  @IsString()
  @Expose()
  balance: string;

  constructor(entity: Partial<UserEntity>) {
    return plainToInstance(UserDto, entity, { excludeExtraneousValues: true });
  }
}