import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Playlist} from "../playlists/playlists.model";
import {Musician} from "../musicians/musicians.model";
import {Ban} from "./bans.model";

interface UserCreationAttrs {
    email: string;
    password: string;
    username: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@outlook.com', description: 'Почтовый ящик'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '1234567', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'Shroud', description: 'Имя пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    username: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Playlist)
    playlists: Playlist[]

    @HasOne(() => Musician)
    musicians: Musician

    @HasOne(() => Ban)
    bans: Ban
}