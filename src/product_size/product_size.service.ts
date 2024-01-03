import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product_size } from './model/product_size.model';
import { CreateProdcut_SizeDto } from './dto/create-product_size.dto';
import { UpdateProdcut_SizeDto } from './dto/update-product_size.dto';

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectModel(Product_size)
    private readonly Product_sizeRepository: typeof Product_size,
  ) {}

  async create(createProduct_SizeDto: CreateProdcut_SizeDto) {
    const newProductSize = await this.Product_sizeRepository.create(
      createProduct_SizeDto,
    );
    return newProductSize;
  }

  async findAll() {
    return await this.Product_sizeRepository.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.Product_sizeRepository.findByPk(id);
  }

  async findByProductId(product_id: number) {
    return await this.Product_sizeRepository.findAll({
      where: { product_id: product_id },
    });
  }

  async update(id: number, updateProducrt_sizeDto: UpdateProdcut_SizeDto) {
    const updating = await this.Product_sizeRepository.update(
      updateProducrt_sizeDto,
      {
        where: { id: id },
      },
    );
    return updating;
  }

  async remove(id: number) {
    const deleting = await this.Product_sizeRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
