import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reviews } from './model/reviews.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews) private readonly ReviewRepository: typeof Reviews,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const newReview = await this.ReviewRepository.create(createReviewDto);
    return newReview;
  }

  async findAll() {
    return await this.ReviewRepository.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.ReviewRepository.findByPk(id, { include: { all: true } });
  }

  async findByProductId(product_id: number) {
    return await this.ReviewRepository.findAll({
      where: { product_id: product_id },
      include: { all: true },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const updating = await this.ReviewRepository.update(updateReviewDto, {
      where: { id: id },
    });
    return updating;
  }

  async remove(id: number) {
    const deleting = await this.ReviewRepository.destroy({ where: { id: id } });
    return deleting;
  }
}
