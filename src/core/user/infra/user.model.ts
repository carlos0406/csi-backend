import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ValueTransformer,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

const transformer: Record<'date' | 'bigint', ValueTransformer> = {
  date: {
    from: (date: string | null) => date && new Date(parseInt(date, 10)),
    to: (date?: Date) => date?.valueOf().toString(),
  },
  bigint: {
    from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
    to: (bigInt?: number) => bigInt?.toString(),
  },
};

@Entity({ name: 'users', schema: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string | null;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email!: string | null;

  @Column({ type: 'varchar', nullable: true, transformer: transformer.date })
  emailVerified!: string | null;

  @Column({ type: 'varchar', nullable: true })
  image!: string | null;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions!: SessionEntity[];

  @OneToMany(() => UserRoleEntity, (role) => role.user)
  roles!: UserRoleEntity[];

  @OneToMany(() => AccountEntity, (account) => account.user)
  accounts!: AccountEntity[];
}

@Entity({ name: 'accounts', schema: 'users' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column()
  type!: string;

  @Column()
  provider!: string;

  @Column()
  providerAccountId!: string;

  @Column({ type: 'varchar', nullable: true })
  refresh_token!: string | null;

  @Column({ type: 'varchar', nullable: true })
  access_token!: string | null;

  @Column({
    nullable: true,
    type: 'bigint',
    transformer: transformer.bigint,
  })
  expires_at!: number | null;

  @Column({ type: 'varchar', nullable: true })
  token_type!: string | null;

  @Column({ type: 'varchar', nullable: true })
  scope!: string | null;

  @Column({ type: 'varchar', nullable: true })
  id_token!: string | null;

  @Column({ type: 'varchar', nullable: true })
  session_state!: string | null;

  @ManyToOne(() => UserEntity, (user) => user.accounts, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;
}

@Entity({ name: 'sessions', schema: 'users' })
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  sessionToken!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ transformer: transformer.date })
  expires!: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;
}

@Entity({ name: 'verification_tokens', schema: 'users' })
export class VerificationTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  token!: string;

  @Column()
  identifier!: string;

  @Column({ transformer: transformer.date })
  expires!: string;
}

@Entity({ name: 'user_roles', schema: 'users' })
export class UserRoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ type: 'uuid' })
  userId!: string;
  @Column({ type: 'varchar' })
  role!: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;
}

export const UserEntities = [
  UserEntity,
  SessionEntity,
  AccountEntity,
  VerificationTokenEntity,
  UserRoleEntity,
];
