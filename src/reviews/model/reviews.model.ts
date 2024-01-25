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
import { User } from '../../user/model/user.model';

interface ReviewAtr {
  review: String;
  rate: Number;
  product_id: Number;
  user_id: Number;
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

  @ApiProperty({ example: 5, description: 'Mahsulotga baho 1 va 5 oralig`ida' })
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

  @ForeignKey(() => User)
  @ApiProperty({ example: 1, description: 'User idsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;
  @BelongsTo(() => User)
  user: User;
}
