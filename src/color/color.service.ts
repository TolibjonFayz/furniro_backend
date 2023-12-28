import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Color } from './model/color.model';
import { CreateColoryDto } from './dto/create-color.dto';
import { UpdateColoryDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectModel(Color) private readonly colorRepository: typeof Color,
  ) {}

  //Create color
  async create(createColoryDto: CreateColoryDto) {
    return await this.colorRepository.create(createColoryDto);
  }

  //Find all color
  async findAll() {
    return await this.colorRepository.findAll({});
  }

  //Find color by id
  async findById(id: number) {
    return await this.colorRepository.findByPk(id);
  }

  //Update color by id
  async update(id: number, updateColoryDto: UpdateColoryDto) {
    return await this.colorRepository.update(updateColoryDto, {
      where: { id: id },
    });
  }

  //Delete color by id
  async remove(id: number) {
    return await this.colorRepository.destroy({ where: { id: id } });
  }
}
