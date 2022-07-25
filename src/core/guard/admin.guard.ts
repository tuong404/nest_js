import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from './authortication.guard';

@Injectable()
export class AdminGuard extends AuthorizationGuard {
  constructor() {
    super(['admin']);
  }
}
