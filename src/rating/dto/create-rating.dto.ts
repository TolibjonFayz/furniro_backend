import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ example: 4, description: 'Mahsulotning bahosi' })
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @ApiProperty({ example: 1, description: 'Product idsi' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
