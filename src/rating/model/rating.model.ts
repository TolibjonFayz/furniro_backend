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

interface RatingAtr {
  rate: Number;
  product_id: Number;
}

@Table({ tableName: 'rating' })
export class Rating extends Model<Rating, RatingAtr> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1, ., ., ., 5', description: 'Mahsulotning bahosi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rate: number;

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
