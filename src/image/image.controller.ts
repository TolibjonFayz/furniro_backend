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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('create')
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @Get('all')
  findAll() {
    return this.imageService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.imageService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(id, updateImageDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.imageService.remove(id);
  }
}
