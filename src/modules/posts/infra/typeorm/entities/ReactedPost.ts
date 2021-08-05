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

@Entity('reacted_posts')
class ReactedPost {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  reaction_id: string;

  @Column()
  user_id: string;

  @Column()
  post_id: string;

  @ManyToOne(() => Post, (post: Post) => post.reactions)
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

export default ReactedPost;
