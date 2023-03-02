import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { User } from "./users.model";
import { Song } from "../songs/songs.model";

@Table({tableName: 'likes', updatedAt: false})
export class Likes extends Model<Likes> {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: '4', description: 'Идентификатор пользователя'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;

  @ApiProperty({example: '7', description: 'Идентификатор песни'})
  @ForeignKey(() => Song)
  @Column({type: DataType.INTEGER, allowNull: false})
  songId: number;
}