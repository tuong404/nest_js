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
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { NextFunction, Request, Response } from 'express';
import { AuthLogin, CreateAuthDto } from 'src/core/dto/dto.auth';
import { SucessResponse } from 'src/core/response/success/success.response';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register')
  // register(
  //   @Body() data: CreateAuthDto,
  //   @Req() req: Request,
  //   @Res() res: Response,
  //   @Next() next: NextFunction,
  // ) {
  //   return this.authService.register(data, req, res, next);
  // }
}
