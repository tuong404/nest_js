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
} from '@nestjs/common';
import { CreateHouseDto } from 'src/core/pipe/dto/dto.house';
import { paramDTO } from 'src/core/pipe/dto/dto.param';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { AuthenticationGuard } from 'src/core/guard/authentication.guard';
import { ManagerGuard } from 'src/core/guard/manager.guard';

@Controller()
@UseGuards(AuthenticationGuard, ManagerGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create/house')
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

  @Put(':idhouse')
  updateHouse(@Body() data: any, @Param() params, @Res() res: Response) {
    return this.userService.updateHouse(data, params, res);
  }

  //get all house by user
  @Get()
  findAllHouse(@Req() req: Request, @Res() res: Response) {
    return this.userService.findAllHouse(req, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
