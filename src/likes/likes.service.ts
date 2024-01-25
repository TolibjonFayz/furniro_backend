import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Likes } from './model/like.model';
import { Product } from '../product/model/product.model';
import { Category } from '../category/models/category.model';
import { Image } from '../image/model/image.model';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Likes)
    private readonly LikesRepository: typeof Likes,
  ) {}

  async create(createLikeDto: CreateLikeDto) {
    const newLike = await this.LikesRepository.create(createLikeDto);
    return newLike;
  }

  async findAll() {
    return await this.LikesRepository.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.LikesRepository.findByPk(id);
  }

  async findByUser(user_id: number) {
    return await this.LikesRepository.findAll({
      where: { user_id: user_id },
      include: [
        { model: Product, include: [{ model: Category }] },
        { model: Product, include: [{ model: Image }] },
        { all: true },
      ],
    });
  }

  async update(id: number, updateLikeDto: UpdateLikeDto) {
    const updating = await this.LikesRepository.update(updateLikeDto, {
      where: { id: id },
    });
    return updating;
  }

  async removeLikeByIds(updateLikeDto: UpdateLikeDto) {
    console.log(updateLikeDto);

    const deletingLike = await this.LikesRepository.destroy({
      where: {
        user_id: updateLikeDto.user_id,
        product_id: updateLikeDto.product_id,
      },
    });
    return deletingLike;
  }

  async remove(id: number) {
    const deleting = await this.LikesRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
