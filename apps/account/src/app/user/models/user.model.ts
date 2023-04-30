import {Column, DataType, Model, Table} from "sequelize-typescript";
import {IUser, UserRole} from "@music_service_api/interfaces";

interface UserCreationAttr {
  email: string,
  passwordHash: string,
  username: string,
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

  @Column({type: DataType.ENUM, values: [UserRole.User, UserRole.Admin, UserRole.Musician, UserRole.Podcaster] , allowNull: false, defaultValue: UserRole.User, })
  role: UserRole;
}
