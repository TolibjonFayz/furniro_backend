import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from '../../product/model/product.model';
import { Color } from '../../color/model/color.model';

interface Prodcut_colorAtr {
  product_id: Number;
  color_id: Number;
}

@Table({ tableName: 'product_color' })
export class Product_color extends Model<Product_color, Prodcut_colorAtr> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Color)
  @ApiProperty({ example: 1, description: 'Mahsulotning rangi idsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  color_id: number;
  @BelongsTo(() => Color)
  color: Color;

  @ForeignKey(() => Product)
  @ApiProperty({ example: 1, description: 'Product idsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;
  @BelongsTo(() => Product)
  product: Product;
}
