import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('permissions')
class Permission {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userid: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column()
  blog: string;

  @Column()
  ecommerce: string;

  @Column()
  admin: string;
}

export default Permission;
