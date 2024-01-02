import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateRatingDto {
  @ApiProperty({ example: '1, ., ., ., 5', description: 'Mahsulotning bahosi' })
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @ApiProperty({ example: 1, description: 'Product idsi' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
