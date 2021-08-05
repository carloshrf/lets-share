export default interface IUserResponse {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  created_at: Date;
  updated_at: Date;
  avatar: string;
  avatar_url(): string;
}
