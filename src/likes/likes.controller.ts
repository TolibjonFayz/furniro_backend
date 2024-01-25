import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({ summary: 'Create like' })
  @Post('create')
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @ApiOperation({ summary: 'Get likes' })
  @Get('all')
  findAll() {
    return this.likesService.findAll();
  }

  @ApiOperation({ summary: 'Get likes by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.likesService.findOne(id);
  }

  @ApiOperation({ summary: 'Get likes by user id' })
  @Get('user/:id')
  findByUserId(@Param('id') user_id: number) {
    return this.likesService.findByUser(user_id);
  }

  @ApiOperation({ summary: 'Update like by id' })
  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(id, updateLikeDto);
  }

  @ApiOperation({ summary: 'Delete like by user_id and product_id' })
  @Post('delete/user')
  removeByUserId(@Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.removeLikeByIds(updateLikeDto);
  }

  @ApiOperation({ summary: 'Delete like by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.likesService.remove(id);
  }
}
