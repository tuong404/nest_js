import {
  ConsoleLogger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './router/auth/auth.module';
import { UserModule } from './router/user/user.module';
import { AuthController } from './router/auth/auth.controller';
import { AuthService } from './router/auth/auth.service';
import { AdminModule } from './router/admin/admin.module';
import { StrangerModule } from './router/stranger/stranger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { RouteModule } from './router/router.module';
import { HttpExceptionFilter } from './core/filter/http.filter';
// import AuthMiddleware from './core/middleware/get-user.middleware';
import { UserController } from './router/user/user.controller';
import { LoggerMiddleware } from './core/middleware/getUser.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
require('dotenv').config();

@Module({
  imports: [
    RouteModule,
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('api/user');
    consumer.apply(LoggerMiddleware).forRoutes('api/admin');
  }
}

// export class AppModule {}
