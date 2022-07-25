import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AdminGuard } from 'src/core/guard/admin.guard';
import { AuthenticationGuard } from 'src/core/guard/authentication.guard';
import { AdminService } from './admin.service';
import { Request, Response } from 'express';
import { idBody } from '../../core/pipe/dto/idBody';
import { HouseService } from '../house/house.service';

@Controller()
@UseGuards(AuthenticationGuard, AdminGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private houseService: HouseService,
  ) {}

  @Post('update-user')
  updateUser(@Body() data: idBody, @Req() req: Request, @Res() res: Response) {
    return this.adminService.updateUser(data, req, res);
  }

  @Post('update-house')
  updateHouse(@Body() data: idBody, @Req() req: Request, @Res() res: Response) {
    return this.houseService.updateHouse(data, req, res);
  }
}
