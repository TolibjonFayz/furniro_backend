import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({ example: 'Yumshoqqina ekan', description: 'Mahsulotga izoh' })
  @IsString()
  @IsNotEmpty()
  review: string;

  @ApiProperty({ example: 1, description: 'Product idsi' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
