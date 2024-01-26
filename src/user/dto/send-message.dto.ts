import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({ example: 'Toshmat', description: 'Ism' })
  @IsNotEmpty()
  userinfo: Object;

  @ApiProperty({ example: '["products info"]', description: 'Products info' })
  @IsNotEmpty()
  products: Object;
}
