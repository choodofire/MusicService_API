import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Musician} from "../musicians/musicians.model";
import {Album} from "../albums/albums.model";
import { User } from "../users/users.model";
import { UserRoles } from "../roles/user-roles.model";
import { Playlist } from "../playlists/playlists.model";
import { PlaylistSongs } from "../playlists/playlist-songs.model";
import { Likes } from "../users/likes.model";

interface SongCreationAttrs {
    title: string;
    audio: string;
    musicianId: number;
    albumId: number;
}

@Table({tableName: 'songs'})
export class Song extends Model<Song, SongCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'True friend', description: 'Название песни'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: '3 234', description: 'Количество прослушиваний'})
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    listens: number;

    @Column({type: DataType.STRING})
    audio: string;

    @ForeignKey(() => Musician)
    @Column({type: DataType.INTEGER, allowNull: false})
    musicianId: number;

    @BelongsTo(() => Musician)
    author: Musician;

    @ForeignKey(() => Album)
    @Column({type: DataType.INTEGER, allowNull: false})
    albumId: number;

    @BelongsTo(() => Album)
    authorAlbum: Album;

    @BelongsToMany(() => Playlist, () => PlaylistSongs)
    playlists: Playlist[];

    @BelongsToMany(() => User, () => Likes)
    users: User[]
}