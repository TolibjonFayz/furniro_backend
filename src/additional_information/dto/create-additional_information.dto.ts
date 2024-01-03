import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddtionalInformationDto {
  @ApiProperty({ example: 1, description: 'Product idsi' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ example: 'Example', description: 'Product sales package' })
  sales_package: String;

  @ApiProperty({ example: 'Example', description: 'Product model number' })
  model_number: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product secondary material',
  })
  secondary_material: String;

  @ApiProperty({ example: 'Example', description: 'Product configuration' })
  configuration: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product upholstery material',
  })
  upholstery_material: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product upholstery color',
  })
  upholstery_color: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product filling material',
  })
  filling_material: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product finish type',
  })
  finish_type: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product maximum load capacity',
  })
  maximum_load_capacity: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product origin of manufacture',
  })
  origin_of_manufacture: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product width',
  })
  width: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product height',
  })
  height: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product depth',
  })
  depth: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product weight',
  })
  weight: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product warranty summary',
  })
  warranty_summary: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product domestic warranty',
  })
  domestic_warranty: String;

  @ApiProperty({
    example: 'Example',
    description: 'Product warranty service type',
  })
  warranty_service_type: String;
}
