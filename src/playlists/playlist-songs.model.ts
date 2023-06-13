import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from './playlists.model';
import { Song } from '../songs/songs.model';

@Table({ tableName: 'playlist_songs', createdAt: false, updatedAt: false })
export class PlaylistSongs extends Model<PlaylistSongs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '2', description: 'Идентификатор плейлиста' })
  @ForeignKey(() => Playlist)
  @Column({ type: DataType.INTEGER, allowNull: false })
  playlistId: number;

  @ApiProperty({ example: '4', description: 'Идентификатор песни' })
  @ForeignKey(() => Song)
  @Column({ type: DataType.INTEGER, allowNull: false })
  songId: number;
}
