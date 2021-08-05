import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uudiV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    if (this.avatar) {
      switch (process.env.DISK) {
        case 'local':
          return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
        case 's3':
          return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
        default:
          return null;
      }
    }

    return null;
  }

  constructor() {
    if (!this.id) {
      this.id = uudiV4();
    }
    this.isAdmin = false;
  }
}

export default User;
