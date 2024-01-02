import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateImageDto {
  @ApiProperty({ example: 'kdjasjbfs.png', description: 'Mahsulot rasmi' })
  @IsString()
  @IsNotEmpty()
  img_url: string;

  @ApiProperty({ example: 1, description: 'Product idsi' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
