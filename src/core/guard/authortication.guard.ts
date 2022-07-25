import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRole: string[]) {
    // console.log(allowedRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];
    const allowed = this.isAllowed([user.role]);
    if (!allowed) {
      throw new ForbiddenException(
        `you is ${user.role} nen dell co quyen this`,
      );
    }
    return true;
  }
  isAllowed(userRole: string[]) {
    let allowed = false;
    userRole.forEach((role) => {
      if (!allowed && this.allowedRole.includes(role)) {
        allowed = true;
      }
    });
    return allowed;
  }
}
