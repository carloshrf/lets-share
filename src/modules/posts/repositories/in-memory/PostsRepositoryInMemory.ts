import ISavePostDTO from '../../dtos/ISavePostDTO';
import Post from '../../infra/typeorm/entities/Post';
import IPostsRepository from '../IPostsRepository';

class PostsRepositoryInMemory implements IPostsRepository {
  private posts: Post[] = [];

  async save({ id, content, title, user_id }: ISavePostDTO): Promise<Post> {
    if (!id) {
      const post = new Post();

      Object.assign(post, {
        user_id,
        title,
        content,
      });

      this.posts.push(post);

      return post;
    }

    const index = this.posts.findIndex((post) => post.id === id);

    this.posts[index] = { ...this.posts[index], content, title };

    return this.posts[index];
  }
  async findAll(): Promise<Post[]> {
    return this.posts;
  }
  async findPostById(id: string): Promise<Post> {
    const post = this.posts.find((post) => post.id === id);

    return post;
  }
  async findPostsByUser(user_id: string): Promise<Post[]> {
    const posts = this.posts.filter((post) => post.user_id === user_id);

    return posts;
  }
  async delete(id: string): Promise<void> {
    const index = this.posts.findIndex((post) => post.id === id);

    this.posts.splice(index, 1);
  }
}

export default PostsRepositoryInMemory;
