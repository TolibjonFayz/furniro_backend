import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './model/rating.model';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating) private readonly RatingRepository: typeof Rating,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    const newRating = await this.RatingRepository.create(createRatingDto);
    return newRating;
  }

  async findAll() {
    return await this.RatingRepository.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.RatingRepository.findByPk(id);
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    const updating = await this.RatingRepository.update(updateRatingDto, {
      where: { id: id },
    });
    return updating;
  }

  async remove(id: number) {
    const deleting = await this.RatingRepository.destroy({ where: { id: id } });
    return deleting;
  }
}
