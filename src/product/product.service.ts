import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { Color } from '../color/model/color.model';
import { Product_color } from '../product_color/model/product_color.model';
import { Product_size } from '../product_size/model/product_size.model';
import { Size } from '../size/model/size.model';
import { SearchProductDto } from './dto/search-product.dto';
import Sequelize, { where } from 'sequelize';
const { Op } = Sequelize;

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

  async findAllProducts(
    page: number,
    limit: number,
    searchProductDto: SearchProductDto,
  ) {
    let count = Number();
    let products = [];
    try {
      let limit_1: number;
      let page_1: number;
      page_1 = +page > 1 ? +page : 1;
      limit_1 = +limit > 0 ? +limit : null;
      // First if == 1
      if (searchProductDto.by == 1) {
        if (
          searchProductDto.category >= 1 &&
          searchProductDto.search.length >= 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              category_id: searchProductDto.category,
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            order: [['price', 'ASC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          const forcount = await this.productRepository.findAll({
            where: {
              category_id: searchProductDto.category,
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            attributes: ['name', 'price'],
            order: [['price', 'ASC']],
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
          count = forcount.length;
          return { products, count };
        }
        if (
          searchProductDto.category >= 1 &&
          searchProductDto.search.length < 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              category_id: searchProductDto.category,
            },
            order: [['price', 'ASC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = products.length;
          return { products, count };
        }

        if (
          searchProductDto.category < 1 &&
          searchProductDto.search.length >= 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            order: [['price', 'ASC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          const forcount = await this.productRepository.findAll({
            where: {
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            attributes: ['name', 'price'],
            order: [['price', 'ASC']],
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
          count = forcount.length;
          return { products, count };
        }

        if (
          searchProductDto.category < 1 &&
          searchProductDto.search.length < 1
        ) {
          products = await this.productRepository.findAll({
            order: [['price', 'ASC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = await this.productRepository.count();
          return { products, count };
        }
      }
      // First if == 2
      else if (searchProductDto.by == 2) {
        if (
          searchProductDto.category >= 1 &&
          searchProductDto.search.length >= 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              category_id: searchProductDto.category,
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            order: [['price', 'DESC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = products.length;
          return { products, count };
        }
        if (
          searchProductDto.category >= 1 &&
          searchProductDto.search.length < 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              category_id: searchProductDto.category,
            },
            order: [['price', 'DESC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = products.length;
          return { products, count };
        }

        if (
          searchProductDto.category < 1 &&
          searchProductDto.search.length >= 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            order: [['price', 'DESC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          const forcount = await this.productRepository.findAll({
            where: {
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            attributes: ['name', 'price'],
            order: [['price', 'DESC']],
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
          count = forcount.length;
          return { products, count };
        }

        if (
          searchProductDto.category < 1 &&
          searchProductDto.search.length < 1
        ) {
          products = await this.productRepository.findAll({
            order: [['price', 'DESC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = await this.productRepository.count();
          return { products, count };
        }
      }
      // First if == 3
      else if (searchProductDto.by == 3) {
        if (
          searchProductDto.category >= 1 &&
          searchProductDto.search.length >= 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              category_id: searchProductDto.category,
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            order: [['name', 'ASC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = products.length;
          return { products, count };
        }
        if (
          searchProductDto.category >= 1 &&
          searchProductDto.search.length < 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              category_id: searchProductDto.category,
            },
            order: [['name', 'ASC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = products.length;
          return { products, count };
        }

        if (
          searchProductDto.category < 1 &&
          searchProductDto.search.length >= 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            order: [['name', 'ASC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          const forcount = await this.productRepository.findAll({
            where: {
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            attributes: ['name', 'price'],
            order: [['name', 'ASC']],
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
          count = forcount.length;
          return { products, count };
        }

        if (
          searchProductDto.category < 1 &&
          searchProductDto.search.length < 1
        ) {
          products = await this.productRepository.findAll({
            order: [['name', 'ASC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = await this.productRepository.count();
          return { products, count };
        }
      }
      // First if == 4
      else if (searchProductDto.by == 4) {
        if (
          searchProductDto.category >= 1 &&
          searchProductDto.search.length >= 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              category_id: searchProductDto.category,
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            order: [['name', 'DESC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = products.length;
          return { products, count };
        }
        if (
          searchProductDto.category >= 1 &&
          searchProductDto.search.length < 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              category_id: searchProductDto.category,
            },
            order: [['name', 'DESC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = products.length;
          return { products, count };
        }

        if (
          searchProductDto.category < 1 &&
          searchProductDto.search.length >= 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            order: [['name', 'DESC']],
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          const forcount = await this.productRepository.findAll({
            where: {
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            attributes: ['name', 'price'],
            order: [['name', 'DESC']],
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
          count = forcount.length;
          return { products, count };
        }

        if (
          searchProductDto.category < 1 &&
          searchProductDto.search.length < 1
        ) {
          products = await this.productRepository.findAll({
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
            order: [['name', 'DESC']],
          });
          count = await this.productRepository.count();
          return { products, count };
        }
      } // First if == ""
      else if (searchProductDto.by < 1) {
        if (
          searchProductDto.category >= 1 &&
          searchProductDto.search.length >= 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              category_id: searchProductDto.category,
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = products.length;
          return { products, count };
        }
        if (
          searchProductDto.category >= 1 &&
          searchProductDto.search.length < 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              category_id: searchProductDto.category,
            },
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = products.length;
          return { products, count };
        }

        if (
          searchProductDto.category < 1 &&
          searchProductDto.search.length >= 1
        ) {
          products = await this.productRepository.findAll({
            where: {
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          const forcount = await this.productRepository.findAll({
            where: {
              name: {
                [Op.iLike]: `%${searchProductDto.search}%`,
              },
            },
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
          count = forcount.length;
          return { products, count };
        }

        if (
          searchProductDto.category < 1 &&
          searchProductDto.search.length < 1
        ) {
          products = await this.productRepository.findAll({
            offset: (page_1 - 1) * limit_1,
            limit: limit_1,
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
          count = await this.productRepository.count();
          return { products, count };
        }
      } else {
        products = await this.productRepository.findAll({
          offset: (page_1 - 1) * limit_1,
          limit: limit_1,
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
        count = await this.productRepository.count();
        return { products, count };
      }
    } catch (error) {
      throw new BadRequestException('Bad request from client', error);
    }
  }

  async getProductsByLimit(limit: number) {
    const products = await this.productRepository.findAll({
      limit: limit,
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
    const count = await this.productRepository.count();
    return { products, count };
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

  async getProductByCategoryId(category_id: number, limit: number) {
    const res = await this.productRepository.findAll({
      limit: limit,
      where: { category_id: category_id },
      include: { all: true },
    });
    const count = await this.productRepository.count({
      where: { category_id: category_id },
    });
    return { res, count };
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
