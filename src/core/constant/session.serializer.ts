import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/router/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, { id: user.id });
  }
  async deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): Promise<any> {
    const user = await this.userService.findOne(payload.id);
    console.log(user);
    done(null, user);
  }
}
