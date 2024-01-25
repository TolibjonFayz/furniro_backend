import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 'Yumshoqqina ekan', description: 'Mahsulotga izoh' })
  @IsString()
  @IsNotEmpty()
  review: string;

  @ApiProperty({ example: 5, description: 'Mahsulotga baho 1 va 5 oralig`ida' })
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @ApiProperty({ example: 1, description: 'Product idsi' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ example: 7, description: 'User idsi' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
