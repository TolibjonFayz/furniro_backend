import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupUserDto {
  @ApiProperty({ example: 'Toshmat', description: 'Ism' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Toshmatov', description: 'Familiya' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: '+998901234567', description: 'Raqam' })
  @IsString()
  @IsNotEmpty()
  phone_number: string;
}
