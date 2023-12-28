import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSizeDto {
  @ApiProperty({ example: 'S, M, X', description: 'Mahsulot o`lchami' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
