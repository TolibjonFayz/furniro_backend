import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Size } from './model/size.model';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectModel(Size) private readonly sizeRepository: typeof Size,
  ) {}

  //Create size
  async create(createSizeDto: CreateSizeDto) {
    return await this.sizeRepository.create(createSizeDto);
  }

  //Find all sizes
  async findAll() {
    return await this.sizeRepository.findAll({});
  }

  //Find size by id
  async findById(id: number) {
    return await this.sizeRepository.findByPk(id);
  }

  //Update size by id
  async update(id: number, updateSizeDto: UpdateSizeDto) {
    return await this.sizeRepository.update(updateSizeDto, {
      where: { id: id },
    });
  }

  //Delete size by id
  async remove(id: number) {
    return await this.sizeRepository.destroy({ where: { id: id } });
  }
}
