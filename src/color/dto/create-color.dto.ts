import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColoryDto {
  @ApiProperty({ example: 'Green', description: 'Mahsulot rangi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '#ldnfasn', description: 'Mahsulot rangi hex codi' })
  @IsString()
  @IsNotEmpty()
  hex_code: string;
}
