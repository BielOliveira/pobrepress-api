import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('blogcategories')
class BlogCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userid: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column()
  name: string;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}

export default BlogCategory;
