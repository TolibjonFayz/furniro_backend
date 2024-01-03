import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductColorService } from './product_color.service';
import { CreateProdcut_ColorDto } from './dto/create-product_color.dto';
import { UpdateProdcut_ColorDto } from './dto/update-product_color.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../product/dto/create-product.dto';

@ApiTags('Product Color')
@Controller('product-color')
export class ProductColorController {
  constructor(private readonly productColorService: ProductColorService) {}

  @ApiOperation({ summary: 'Create product color' })
  @Post('create')
  create(@Body() createProductColorDto: CreateProdcut_ColorDto) {
    return this.productColorService.create(createProductColorDto);
  }

  @ApiOperation({ summary: 'Get product colors' })
  @Get('all')
  findAll() {
    return this.productColorService.findAll();
  }

  @ApiOperation({ summary: 'Get product colors by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.productColorService.findOne(id);
  }

  @ApiOperation({ summary: 'Update product colors by id' })
  @Put('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateProductColorDto: UpdateProdcut_ColorDto,
  ) {
    return this.productColorService.update(id, updateProductColorDto);
  }

  @ApiOperation({ summary: 'Delete product colors by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.productColorService.remove(id);
  }
}
