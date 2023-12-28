import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryRepository: typeof Category,
  ) {}

  //Create category
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.create(createCategoryDto);
  }

  //Find all categories
  async findAll() {
    return await this.categoryRepository.findAll({});
  }

  //Find category by id
  async findById(id: number) {
    return await this.categoryRepository.findByPk(id);
  }

  //Update category by id
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(updateCategoryDto, {
      where: { id: id },
    });
  }

  //Delete category by id
  async remove(id: number) {
    return await this.categoryRepository.destroy({ where: { id: id } });
  }
}
