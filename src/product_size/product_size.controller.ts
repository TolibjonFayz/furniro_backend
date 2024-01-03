import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductSizeService } from './product_size.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProdcut_SizeDto } from './dto/create-product_size.dto';
import { UpdateProdcut_SizeDto } from './dto/update-product_size.dto';

@ApiTags('Product size')
@Controller('product-size')
export class ProductSizeController {
  constructor(private readonly productSizeService: ProductSizeService) {}

  @ApiOperation({ summary: 'Create product size' })
  @Post('create')
  create(@Body() createProductSizeDto: CreateProdcut_SizeDto) {
    return this.productSizeService.create(createProductSizeDto);
  }

  @ApiOperation({ summary: 'Get product sizes' })
  @Get('all')
  findAll() {
    return this.productSizeService.findAll();
  }

  @ApiOperation({ summary: 'Get product sizes by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.productSizeService.findOne(id);
  }

  @ApiOperation({ summary: 'Update product size by id' })
  @Put('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateProductSizeDto: UpdateProdcut_SizeDto,
  ) {
    return this.productSizeService.update(id, updateProductSizeDto);
  }

  @ApiOperation({ summary: 'Delete product size by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.productSizeService.remove(id);
  }
}
