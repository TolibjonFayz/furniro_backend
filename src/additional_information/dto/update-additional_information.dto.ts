import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAddtionalInformationDto {
  @ApiProperty({ example: 1, description: 'Product idsi' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ example: 'Example', description: 'Product sales package' })
  sales_package: string;

  @ApiProperty({ example: 'Example', description: 'Product model number' })
  model_number: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product secondary material',
  })
  secondary_material: string;

  @ApiProperty({ example: 'Example', description: 'Product configuration' })
  configuration: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product upholstery material',
  })
  upholstery_material: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product upholstery color',
  })
  upholstery_color: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product filling material',
  })
  filling_material: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product finish type',
  })
  finish_type: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product maximum load capacity',
  })
  maximum_load_capacity: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product origin of manufacture',
  })
  origin_of_manufacture: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product width',
  })
  width: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product height',
  })
  height: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product depth',
  })
  depth: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product weight',
  })
  weight: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product warranty summary',
  })
  warranty_summary: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product domestic warranty',
  })
  domestic_warranty: string;

  @ApiProperty({
    example: 'Example',
    description: 'Product warranty service type',
  })
  warranty_service_type: string;
}
