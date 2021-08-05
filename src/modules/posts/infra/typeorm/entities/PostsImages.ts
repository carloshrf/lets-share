import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import Post from './Post';

@Entity('posts_images')
class PostsImages {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  post_id: string;

  @ManyToOne(() => Post, (post: Post) => post.images)
  @JoinColumn({ name: 'post_id' })
  post: Post;

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

export default PostsImages;
