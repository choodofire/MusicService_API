import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Album} from "../albums/albums.model";
import {Song} from "../songs/songs.model";
import { Subscriptions } from "../follow/subscription.model";


interface MusicianCreationAttrs {
    name: string;
    password: string;
    userId: number;
    image: string;
}

@Table({tableName: 'musicians'})
export class Musician extends Model<Musician, MusicianCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Bad Omens', description: 'Название исполнителя'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: '1234567', description: 'Пароль к профилю исполнителя'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: '/avatarsMusician/bmth.jpg', description: 'Путь к файлу'})
    @Column({type: DataType.STRING})
    image: string;

    @HasMany(() => Album)
    albums: Album[]

    @HasMany(() => Song)
    songs: Song[]

    @ApiProperty({example: 3, description: 'Идентификатор пользователя'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsToMany(() => User, () => Subscriptions)
    users: User[]
}