import { Injectable } from '@nestjs/common';
import { CreateProdcut_ColorDto } from './dto/create-product_color.dto';
import { UpdateProdcut_ColorDto } from './dto/update-product_color.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product_color } from './model/product_color.model';

@Injectable()
export class ProductColorService {
  constructor(
    @InjectModel(Product_color)
    private readonly Product_colorRepository: typeof Product_color,
  ) {}

  async create(createProduct_ColorDto: CreateProdcut_ColorDto) {
    const newProductColor = await this.Product_colorRepository.create(
      createProduct_ColorDto,
    );
    return newProductColor;
  }

  async findAll() {
    return await this.Product_colorRepository.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.Product_colorRepository.findByPk(id);
  }

  async findByProductId(product_id: number) {
    return await this.Product_colorRepository.findAll({
      where: { product_id: product_id },
    });
  }

  async update(id: number, updateImageDto: UpdateProdcut_ColorDto) {
    const updating = await this.Product_colorRepository.update(updateImageDto, {
      where: { id: id },
    });
    return updating;
  }

  async remove(id: number) {
    const deleting = await this.Product_colorRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
