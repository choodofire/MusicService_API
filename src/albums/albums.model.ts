import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Musician} from "../musicians/musicians.model";
import {Song} from "../songs/songs.model";

interface AlbumCreationAttrs {
    title: string;
    musicianId: number;
    image: string;
}

@Table({tableName: 'albums'})
export class Album extends Model<Album, AlbumCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Sempiternal', description: 'Название альбома'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING})
    image: string;

    @HasMany(() => Song)
    songs: Song[]

    @ForeignKey(() => Musician)
    @Column({type: DataType.INTEGER})
    musicianId: number;

    @BelongsTo(() => Musician)
    author: Musician;
}