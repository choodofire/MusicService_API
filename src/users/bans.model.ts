import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.model';

interface BanCreationAttrs {
  email: string;
  password: string;
  username: string;
}

@Table({ tableName: 'bans' })
export class Ban extends Model<Ban, BanCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'true', description: 'Забанен или нет' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'За спам', description: 'Причина блокировки' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'Не забанен',
  })
  banReason: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
