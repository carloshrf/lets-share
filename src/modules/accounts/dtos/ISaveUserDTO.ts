export default interface ISaveUserDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  avatar?: string;
}
