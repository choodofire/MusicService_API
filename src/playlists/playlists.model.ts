import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";

interface PlaylistCreationAttrs {
    title: string;
    userId: number;
    image: string;
}

@Table({tableName: 'playlists'})
export class Playlist extends Model<Playlist, PlaylistCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Для отдыха', description: 'Название плейлиста'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: 'Лучший плейлист', description: 'Описание плейлиста'})
    @Column({type: DataType.STRING, allowNull: false, defaultValue: "Нет описания"})
    description: string;

    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User;
}