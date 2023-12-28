import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateColoryDto {
  @ApiProperty({ example: 'Green', description: 'Mahsulot rangi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Green', description: 'Mahsulot rangi' })
  @IsString()
  @IsNotEmpty()
  hex_code: string;
}
