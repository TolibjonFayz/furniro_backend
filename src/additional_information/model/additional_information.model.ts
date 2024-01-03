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

interface AdditionalInformationAtr {
  product_id: Number;
  sales_package: String;
  model_number: String;
  secondary_material: String;
  configuration: String;
  upholstery_material: String;
  upholstery_color: String;
  filling_material: String;
  finish_type: String;
  maximum_load_capacity: String;
  origin_of_manufacture: String;
  width: String;
  height: String;
  depth: String;
  weight: String;
  warranty_summary: String;
  domestic_warranty: String;
  warranty_service_type: String;
}

@Table({ tableName: 'additionalinformation' })
export class AdditionalInformation extends Model<
  AdditionalInformation,
  AdditionalInformationAtr
> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @ApiProperty({ example: 1, description: 'Product idsi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;
  @BelongsTo(() => Product)
  product: Product;

  @ApiProperty({ example: 'Example', description: 'Product sales package' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sales_package: string;

  @ApiProperty({ example: 'Example', description: 'Product model number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model_number: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product secondary material',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  secondary_material: string;

  @ApiProperty({ example: 'Example', description: 'Product configuration' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  configuration: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product upholstery material',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  upholstery_material: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product upholstery color',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  upholstery_color: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product filling material',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filling_material: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product finish type',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  finish_type: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product maximum load capacity',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  maximum_load_capacity: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product origin of manufacture',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  origin_of_manufacture: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product width',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  width: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product height',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  height: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product depth',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  depth: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product weight',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  weight: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product warranty summary',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  warranty_summary: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product domestic warranty',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  domestic_warranty: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product warranty service type',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  warranty_service_type: string;
}
