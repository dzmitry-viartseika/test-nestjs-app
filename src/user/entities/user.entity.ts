import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'User UUID',
    name: 'user_id',
  })
  readonly userId: string;

  @Column('varchar', {
    comment: 'User login',
    nullable: false,
  })
  login: string;

  @Column('varchar', {
    comment: 'User phone number',
    nullable: false,
    length: 10,
  })
  phone: string;

  @Column('varchar', {
    comment: 'User firstName',
  })
  firstName: string;

  @Column('varchar', {
    comment: 'User lastName',
  })
  lastName: string;

  @Column('varchar', {
    comment: 'User hashed password',
  })
  passwordHash: string;

  @Column('varchar', {
    comment: 'password salt',
  })
  passwordSalt: string;

  @Column('varchar', {
    comment: 'User password',
    nullable: false,
    default: '0',
  })
  balance: string;

  @Column('boolean', {
    comment: 'is deleted userAccount',
    nullable: true,
    default: false,
  })
  isDeleted: boolean;
}
