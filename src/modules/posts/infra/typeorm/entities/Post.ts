import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import User from '../../../../accounts/infra/typeorm/entities/User';
import Comment from './Comment';
import PostsImages from './PostsImages';
import ReactedPost from './ReactedPost';

@Entity('posts')
class Post {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comments: Comment) => comments.post, {
    eager: true,
  })
  comments: Comment[];

  @OneToMany(() => PostsImages, (images: PostsImages) => images.post, {
    eager: true,
  })
  images: PostsImages[];

  @OneToMany(() => ReactedPost, (reactions: ReactedPost) => reactions.post, {
    eager: true,
  })
  reactions: ReactedPost[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export default Post;
