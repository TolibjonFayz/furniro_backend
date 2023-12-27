import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAtr {
  first_name: String;
  last_name: String;
  phone_number: String;
  refresh_token: String;
  is_active: Boolean;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserAtr> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Falonchi', description: 'Ism' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Falonchiyev', description: 'Familiya' })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: '+998 90 123 45 67', description: 'Raqam' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
}
