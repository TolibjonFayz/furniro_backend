import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProdcut_ColorDto {
  @ApiProperty({ example: 1, description: 'Mahsulotning rangi idsi' })
  @IsNumber()
  @IsNotEmpty()
  color_id: number;

  @ApiProperty({ example: 1, description: 'Product idsi' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
