import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'UUID user',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'User login',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User phone number',
    required: true,
    type: String,
  })
  phone: string;

  @ApiProperty({
    description: 'User firstName',
    required: true,
    type: String,
  })
  firstName: string;

  @ApiProperty({
    description: 'User lastName',
    required: true,
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: 'User middleName',
    required: true,
    type: String,
  })
  middleName: string;

  @ApiProperty({
    description: 'User email address',
    required: true,
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'User balance',
    type: String,
  })
  @IsString()
  @Expose()
  balance: string;
}
