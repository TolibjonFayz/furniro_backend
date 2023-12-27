import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({ example: '+998 90 123 45 67', description: 'Raqam' })
  @IsString()
  @IsNotEmpty()
  phone_number: string;
}
