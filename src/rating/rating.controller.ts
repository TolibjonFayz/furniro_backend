import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiOperation({ summary: 'Create rating' })
  @Post('create')
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }

  @ApiOperation({ summary: 'Get all ratings' })
  @Get('all')
  findAll() {
    return this.ratingService.findAll();
  }

  @ApiOperation({ summary: 'Get rating by id' })
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.ratingService.findOne(id);
  }

  @ApiOperation({ summary: 'Update rating by id' })
  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(id, updateRatingDto);
  }

  @ApiOperation({ summary: 'Delete rating by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.ratingService.remove(id);
  }
}
