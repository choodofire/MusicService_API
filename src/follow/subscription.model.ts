import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Musician } from "../musicians/musicians.model";


@Table({tableName: 'subscriptions', updatedAt: false})
export class Subscriptions extends Model<Subscriptions> {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: '4', description: 'Идентификатор пользователя'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;

  @ApiProperty({example: '7', description: 'Идентификатор музыканта'})
  @ForeignKey(() => Musician)
  @Column({type: DataType.INTEGER, allowNull: false})
  musicianId: number;
}