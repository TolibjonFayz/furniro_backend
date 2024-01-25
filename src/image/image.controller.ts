import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({ summary: 'Create image' })
  @Post('create')
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @ApiOperation({ summary: 'Get all images' })
  @Get('all')
  findAll() {
    return this.imageService.findAll();
  }

  @ApiOperation({ summary: 'Get image by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.imageService.findOne(id);
  }

  @ApiOperation({ summary: 'Get image by product id' })
  @Get('product/:id')
  getImageByProductId(@Param('id') id: number) {
    return this.imageService.getImageByProductId(id);
  }

  @ApiOperation({ summary: 'Update image by id' })
  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(id, updateImageDto);
  }

  @ApiOperation({ summary: 'Delete image by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.imageService.remove(id);
  }
}
