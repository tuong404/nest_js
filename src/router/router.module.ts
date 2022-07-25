import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';
import { LoggerMiddleware } from 'src/core/middleware/getUser.middleware';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { StrangerModule } from './stranger/stranger.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/user',
        module: UserModule,
      },
      {
        path: '/home',
        module: StrangerModule,
      },
      {
        path: '/admin',
        module: AdminModule,
      },
    ],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes), // setup the routes
    AuthModule,
    UserModule,
    StrangerModule,
    AdminModule,
  ], // as usual, nothing new
})
// export class RouteModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: 'api/user', method: RequestMethod.ALL });
//   }
// }
export class RouteModule {}
