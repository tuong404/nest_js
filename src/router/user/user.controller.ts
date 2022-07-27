import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  Req,
  Res,
  Put,
  UseGuards,
  Query,
  Next,
  Session,
} from '@nestjs/common';
import { CreateHouseDto } from 'src/core/dto/dto.house';
import { paramDTO } from 'src/core/dto/dto.param';
import { UserService } from './user.service';
import { NextFunction, Request, Response } from 'express';
import { AuthenticationGuard } from 'src/core/nest/guard/authentication.guard';
import { ManagerGuard } from 'src/core/nest/guard/manager.guard';
import { HouseService } from '../house/house.service';
import { getSystemErrorMap } from 'util';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { SucessResponse } from 'src/core/response/success/success.response';
import { CreateAuthDto } from 'src/core/dto/dto.auth';

@Controller()
@UseGuards(AuthenticationGuard, ManagerGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private houseService: HouseService,
  ) {}

  @Post('create/house')
  @UseGuards(AuthenticationGuard, ManagerGuard)
  createHouseByUser(
    @Body() data: CreateHouseDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.userService.createHouseByUser(data, req, res);
  }

  // @Get('allhouse')
  // findAll(@Param() param: paramDTO, @Res() res: Response) {
  //   return this.userService.getAllHouse(param, res);
  // }

  //get all house by user
  @Get()
  findAllHouse(
    // @Param() data: paramDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // console.log(typeof data);
    return this.userService.findAllHouse(req, res);
  }

  @Get('query')
  async find(
    @Query('status') status: string,
    @Query('soft') soft: string,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    return this.houseService.find(status, soft, next, res);
  }

  @Get('myname')
  whatYourName(@Session() session: any) {
    console.log(session);
  }
}
