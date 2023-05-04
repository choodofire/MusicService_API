import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {IUser, IUserPlaylists, PlaylistAccess, UserRole} from "@music_service_api/interfaces";

interface UserCreationAttr {
  email: string,
  passwordHash: string,
  username: string,
}

@Table({tableName: 'user_playlists'})
export class UserPlaylists extends Model<UserPlaylists> implements IUserPlaylists {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  playlistId: number;

  @Column({type: DataType.ENUM, values: [PlaylistAccess.Public, PlaylistAccess.Private, PlaylistAccess.FriendsOnly] , allowNull: false, defaultValue: PlaylistAccess.Public })
  playlistAccess: PlaylistAccess;
}


@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> implements IUser {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  displayName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  passwordHash: string;

  @Column({type: DataType.ENUM, values: [UserRole.User, UserRole.Admin, UserRole.Musician, UserRole.Podcaster] , allowNull: false, defaultValue: UserRole.User })
  role: UserRole;

  @Column({type: DataType.JSONB} )
  playlists: UserPlaylists[]
}
