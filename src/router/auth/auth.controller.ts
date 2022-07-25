import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Next,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { NextFunction, Request, Response } from 'express';
import { AuthLogin, CreateAuthDto } from 'src/core/pipe/dto/dto.auth';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() data: CreateAuthDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return this.authService.register(data, req, res, next);
  }

  @Post('login')
  login(
    @Body() authlogin: AuthLogin,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return this.authService.login(authlogin, req, res, next);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
