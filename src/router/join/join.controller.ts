import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateAuthDto } from 'src/core/dto/dto.auth';
import { SucessResponse } from 'src/core/response/success/success.response';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { Request, Response, NextFunction } from 'express';
import { JoinService } from './join.service';

@Controller()
export class JoinController {
  constructor(private joinService: JoinService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request): any {
    return new SucessResponse({ data: req.user });
  }

  @Post('register')
  @UseGuards(LocalAuthGuard)
  register(@Body() data: CreateAuthDto): any {
    // console.log(data);
    // return new SucessResponse({ message: 'register success' });
  }
}
