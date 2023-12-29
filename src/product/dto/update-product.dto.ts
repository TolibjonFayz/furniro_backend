import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'Sofa birbalo', description: 'Mahsulot nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Yumshoqqina, nimadirgina...',
    description: 'Mahsulot haqida',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '20 000', description: 'Mahsulot narxi' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 20, description: 'Mahsulot soni' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: '20', description: 'Mahsulot chegirmadami' })
  @IsBoolean()
  in_sale: boolean;

  @ApiProperty({ example: '20', description: 'Mahsulot chegirma foizi' })
  @IsNumber()
  @IsNotEmpty()
  sale_percent: number;

  @ApiProperty({ example: '20', description: 'Mahsulot soni' })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
