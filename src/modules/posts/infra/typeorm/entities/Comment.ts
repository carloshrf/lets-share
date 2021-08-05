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

@Entity('comments')
class Comment {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  post_id: string;

  @ManyToOne(() => Post, (post: Post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  user_id: string;

  @Column()
  comment_reply_id: string;

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

export default Comment;
