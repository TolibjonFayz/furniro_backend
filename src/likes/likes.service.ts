import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Likes } from './model/like.model';

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
    });
  }

  async update(id: number, updateLikeDto: UpdateLikeDto) {
    const updating = await this.LikesRepository.update(updateLikeDto, {
      where: { id: id },
    });
    return updating;
  }

  async remove(id: number) {
    const deleting = await this.LikesRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
