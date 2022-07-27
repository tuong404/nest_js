import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from './authortication.guard';

@Injectable()
export class ManagerGuard extends AuthorizationGuard {
  constructor() {
    super(['manager']);
  }
}
