import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { Color } from '../color/model/color.model';
import { Product_color } from '../product_color/model/product_color.model';
import { Product_size } from '../product_size/model/product_size.model';
import { Size } from '../size/model/size.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
  ) {}

  async createProduct(createProfuctDto: CreateProductDto) {
    const newProduct = await this.productRepository.create(createProfuctDto);
    const response = {
      message: 'New product successfully created',
      newProduct,
    };
    return response;
  }

  async findAllProducts() {
    return await this.productRepository.findAll({
      include: [
        {
          model: Product_color,
          include: [{ model: Color }],
        },
        {
          model: Product_size,
          include: [{ model: Size }],
        },
        {
          all: true,
        },
      ],
    });
  }

  async findOneProduct(id: number) {
    return await this.productRepository.findOne({
      where: { id: id },
      include: [
        {
          model: Product_color,
          include: [{ model: Color }],
        },
        {
          model: Product_size,
          include: [{ model: Size }],
        },
        {
          all: true,
        },
      ],
    });
  }

  async getProductByCategoryId(category_id: number) {
    return await this.productRepository.findAll({
      where: { category_id: category_id },
    });
  }

  async updateProduct(id: number, updateProfuctDto: UpdateProductDto) {
    const updating = await this.productRepository.update(updateProfuctDto, {
      where: {
        id: id,
      },
      returning: true,
    });
    return updating;
  }

  async removeProduct(id: number) {
    const deleting = await this.productRepository.destroy({
      where: { id: id },
    });
    return deleting;
  }
}
