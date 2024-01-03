import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './model/cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private readonly CartRepository: typeof Cart,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const newCart = await this.CartRepository.create(createCartDto);
    return newCart;
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
