import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface SizeAtr {
  name: String;
}

@Table({ tableName: 'size' })
export class Size extends Model<Size, SizeAtr> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'S, M, X', description: 'Mahsulot o`lchami' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
