import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  //Create category
  @ApiOperation({ summary: 'Create category' })
  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  //Find all categories
  @ApiOperation({ summary: 'Find all categories' })
  @Get('all')
  findAll() {
    return this.categoryService.findAll();
  }

  //Find category by id
  @ApiOperation({ summary: 'Find category by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findById(id);
  }

  //Update category by id
  @ApiOperation({ summary: 'Update category by id' })
  @Put('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  //Delete category by id
  @ApiOperation({ summary: 'Delete category by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
