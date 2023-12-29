import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
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
  description: String;

  @ApiProperty({ example: 20000, description: 'Mahsulot narxi' })
  @IsNumber()
  @IsNotEmpty()
  price: Number;

  @ApiProperty({ example: 20, description: 'Mahsulot soni' })
  @IsNumber()
  @IsNotEmpty()
  quantity: Number;

  @ApiProperty({ example: false, description: 'Mahsulot chegirmadami' })
  in_sale: Boolean;

  @ApiProperty({ example: '20', description: 'Mahsulot chegirma foizi' })
  sale_percent: Number;

  @ApiProperty({ example: '20', description: 'Mahsulot soni' })
  @IsNumber()
  @IsNotEmpty()
  category_id: Number;
}
