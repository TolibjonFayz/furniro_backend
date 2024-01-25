import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './model/cart.model';
import { Image } from '../image/model/image.model';
import { Product } from '../product/model/product.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private readonly CartRepository: typeof Cart,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const isExists = await this.CartRepository.findOne({
      where: {
        user_id: createCartDto.user_id,
        product_id: createCartDto.product_id,
      },
    });
    if (isExists) {
      const res = await this.CartRepository.update(
        {
          user_id: isExists.user_id,
          product_id: isExists.product_id,
          quantity: (isExists.quantity += createCartDto.quantity),
        },
        {
          where: {
            user_id: createCartDto.user_id,
            product_id: createCartDto.product_id,
          },
        },
      );
      return res;
    } else {
      const newCart = await this.CartRepository.create(createCartDto);
      return newCart;
    }
  }

  async findAll() {
    return await this.CartRepository.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.CartRepository.findByPk(id);
  }

  async findByUser(user_id: number) {
    return await this.CartRepository.findAll({
      where: { user_id: user_id },
      include: { all: true },
    });
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const updating = await this.CartRepository.update(updateCartDto, {
      where: { id: id },
    });
    return updating;
  }

  async remove(id: number) {
    const deleting = await this.CartRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
