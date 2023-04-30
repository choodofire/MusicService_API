export enum UserRole {
  User = 'User',
  Musician = 'Musician',
  Podcaster = 'Podcaster',
  Admin = 'Admin'
}

export interface IUser {
  id?: number;
  username: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole
}
