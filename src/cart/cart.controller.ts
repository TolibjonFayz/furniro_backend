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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create cart' })
  @Post('create')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @ApiOperation({ summary: 'Get carts' })
  @Get('all')
  findAll() {
    return this.cartService.findAll();
  }

  @ApiOperation({ summary: 'Get carts by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.cartService.findOne(id);
  }

  @ApiOperation({ summary: 'Get carts by user id' })
  @Get('user/:id')
  findByUserId(@Param('id') user_id: number) {
    return this.cartService.findByUser(user_id);
  }

  @ApiOperation({ summary: 'Update cart by id' })
  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @ApiOperation({ summary: 'Delete cart by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.cartService.remove(id);
  }
}
