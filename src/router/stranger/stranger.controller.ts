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

@Controller()
export class StrangerController {
  constructor(private readonly strangerService: StrangerService) {}

  @Get('list')
  async findAll() {
    return this.strangerService.findAll();
  }
}
