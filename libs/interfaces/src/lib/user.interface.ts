export enum UserRole {
  User = 'User',
  Musician = 'Musician',
  Podcaster = 'Podcaster',
  Admin = 'Admin'
}

export enum PlaylistAccess {
  Public = 'Public',
  Private = 'Private',
  FriendsOnly = 'FriendsOnly'
}

export interface IUser {
  id?: number;
  username: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  playlists?: IUserPlaylists[];
}

export interface IUserPlaylists {
  playlistId: number;
  playlistAccess: PlaylistAccess;
}
