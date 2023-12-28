import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ColorAtr {
  name: String;
  hex_code: String;
}

@Table({ tableName: 'color' })
export class Color extends Model<Color, ColorAtr> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Green', description: 'Mahsulot rangi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '#ldnfasn', description: 'Mahsulot rangi hex codi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hex_code: string;
}
