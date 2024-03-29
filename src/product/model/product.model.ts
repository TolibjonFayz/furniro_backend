import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Category } from '../../category/models/category.model';
import { Image } from '../../image/model/image.model';
import { Reviews } from '../../reviews/model/reviews.model';
import { Product_color } from '../../product_color/model/product_color.model';
import { Product_size } from '../../product_size/model/product_size.model';
import { AdditionalInformation } from '../../additional_information/model/additional_information.model';

interface ProductAtr {
  name: String;
  description: String;
  price: Number;
  quantity: Number;
  in_sale: Boolean;
  sale_percent: Number;
  category_id: Number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductAtr> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Sofa birbalo', description: 'Mahsulot nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Yumshoqqina, nimadirgina...',
    description: 'Mahsulot haqida',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: '20 000', description: 'Mahsulot narxi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ApiProperty({ example: 20, description: 'Mahsulot soni' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @ApiProperty({ example: '20', description: 'Mahsulot chegirmadami' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  in_sale: boolean;

  @ApiProperty({ example: '20', description: 'Mahsulot chegirma foizi' })
  @Column({
    type: DataType.INTEGER,
  })
  sale_percent: number;

  @ForeignKey(() => Category)
  @ApiProperty({ example: 2, description: 'Mahsulot categoriyasi raqami' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;
  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Image)
  image: Image;

  @HasMany(() => Reviews)
  reviews: Reviews;

  @HasMany(() => Product_color)
  product_color: Product_color;

  @HasMany(() => Product_size)
  product_size: Product_size;

  @HasMany(() => AdditionalInformation)
  additionalInformation: AdditionalInformation;
}
