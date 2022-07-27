import { Injectable, NotFoundException } from '@nestjs/common';

import { CommentService } from '../comment/comment.service';
import { FeedbackService } from '../feedback/feedback.service';
import { HouseService } from '../house/house.service';
import { InjectModel } from '@nestjs/mongoose';
import { user, userDocument } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { Request, Response, NextFunction } from 'Express';
import { AuthLogin, CreateAuthDto } from 'src/core/dto/dto.auth';
import { async } from 'rxjs';
import { UserService } from '../user/user.service';
import { JoinService } from '../join/join.service';

@Injectable()
export class AuthService {
  constructor(private joinService: JoinService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const data = await this.joinService.login(username, password);
    if (data) {
      const token = data.token;
      let user = data.user;
      const { username, password, ...res } = user;
      return { res, token };
    }
    return null;
  }
}
