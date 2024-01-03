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
import { Size } from '../../size/model/size.model';

interface Prodcut_sizeAtr {
  product_id: Number;
  size_id: Number;
}

@Table({ tableName: 'product_size' })
export class Product_size extends Model<Product_size, Prodcut_sizeAtr> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Size)
  @ApiProperty({ example: 1, description: 'Mahsulotning size idsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  size_id: number;
  @BelongsTo(() => Size)
  sizes: Size;

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
