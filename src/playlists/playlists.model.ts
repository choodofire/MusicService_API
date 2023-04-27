import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Song } from '../songs/songs.model';
import { PlaylistSongs } from './playlist-songs.model';

interface PlaylistCreationAttrs {
  title: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'playlists' })
export class Playlist extends Model<Playlist, PlaylistCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Для отдыха', description: 'Название плейлиста' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'Лучший плейлист',
    description: 'Описание плейлиста',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'Нет описания',
  })
  description: string;

  @ApiProperty({
    example: 'playlistAvatars/dsadfk.jpg',
    description: 'Путь к файлу',
  })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: 3, description: 'Идентификатор пользователя' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsToMany(() => Song, () => PlaylistSongs)
  songs: Song[];
}
