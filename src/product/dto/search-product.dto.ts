import { ApiProperty } from '@nestjs/swagger';

export class SearchProductDto {
  @ApiProperty({ example: 'Sofa birbalo', description: 'Mahsulot nomi' })
  search: string;

  @ApiProperty({ example: 2, description: 'Mahsulot category idsi' })
  category: number;

  @ApiProperty({ example: 1, description: 'Mahsulot saralanish tartibi' })
  by: number;
}
