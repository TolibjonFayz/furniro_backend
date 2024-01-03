import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProdcut_SizeDto {
  @ApiProperty({ example: 1, description: 'Mahsulotning size idsi' })
  @IsNumber()
  @IsNotEmpty()
  size_id: number;

  @ApiProperty({ example: 1, description: 'Product idsi' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
