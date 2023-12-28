import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Handmade', description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
