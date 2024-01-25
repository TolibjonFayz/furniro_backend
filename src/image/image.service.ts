import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './model/image.model';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image) private readonly ImageRepository: typeof Image,
  ) {}

  async create(createImageDto: CreateImageDto) {
    const newImage = await this.ImageRepository.create(createImageDto);
    return newImage;
  }

  async findAll() {
    return await this.ImageRepository.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.ImageRepository.findByPk(id);
  }

  async getImageByProductId(product_id: number) {
    return await this.ImageRepository.findOne({
      where: { product_id: product_id },
    });
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    const updating = await this.ImageRepository.update(updateImageDto, {
      where: { id: id },
    });
    return updating;
  }

  async remove(id: number) {
    const deleting = await this.ImageRepository.destroy({ where: { id: id } });
    return deleting;
  }
}
