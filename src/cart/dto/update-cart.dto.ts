import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({ example: 1, description: 'User idsi' })
  user_id: number;

  @ApiProperty({ example: 1, description: 'Product idsi' })
  product_id: number;

  @ApiProperty({ example: 50, description: 'Product bought number' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
