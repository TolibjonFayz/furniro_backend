import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchProductDto } from './dto/search-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //Create product
  @ApiOperation({ summary: 'Create product' })
  @Post('create')
  create(@Body() createProfuctDto: CreateProductDto) {
    return this.productService.createProduct(createProfuctDto);
  }

  //Get all products
  @ApiOperation({ summary: 'Get all products' })
  @Post('all/:q')
  findAll(@Query() q: any, @Body() searchProductDto: SearchProductDto) {
    return this.productService.findAllProducts(
      q?.page,
      q?.limit,
      searchProductDto,
    );
  }

  // Get Products By Limit
  @ApiOperation({ summary: 'Get Products By Limit' })
  @Get('all/limit/:q')
  findAllByLimit(@Query() q: any) {
    return this.productService.getProductsByLimit(q?.limit);
  }

  //Get all products
  @ApiOperation({ summary: 'Get product by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.productService.findOneProduct(id);
  }

  //Get all products
  @ApiOperation({ summary: 'Get product by category id' })
  @Get('category/:id/:q')
  findByCategory(@Query() q: any, @Param('id') id: number) {
    return this.productService.getProductByCategoryId(id, q?.limit);
  }

  //Update product by id
  @ApiOperation({ summary: 'Update product by id' })
  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateProfuctDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProfuctDto);
  }

  //Delete product by id
  @ApiOperation({ summary: 'Delete product by id' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.removeProduct(id);
  }
}
