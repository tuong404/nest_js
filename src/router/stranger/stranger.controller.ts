import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StrangerService } from './stranger.service';
import { CreateStrangerDto } from './dto/create-stranger.dto';
import { UpdateStrangerDto } from './dto/update-stranger.dto';

@Controller()
export class StrangerController {
  constructor(private readonly strangerService: StrangerService) {}

  @Get('list')
  async findAll() {
    return this.strangerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.strangerService.findOne(+id);
  }
}
