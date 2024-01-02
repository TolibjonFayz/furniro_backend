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

interface ReviewAtr {
  review: String;
  product_id: Number;
}

@Table({ tableName: 'reviews' })
export class Reviews extends Model<Reviews, ReviewAtr> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Yumshoqqina ekan', description: 'Mahsulotga izoh' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  review: string;

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
