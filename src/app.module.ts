import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouteModule } from './router/router.module';
import { HttpExceptionFilter } from './core/nest/filter/http.filter';
// import AuthMiddleware from './core/middleware/get-user.middleware';
import { LoggerMiddleware } from './core/nest/middleware/getUser.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './core/nest/interceptor/logging.interceptor';
import { TimeoutInterceptor } from './core/nest/interceptor/timeout.interceptor';
import { TransformInterceptor } from './core/nest/interceptor/transform.interceptor';
require('dotenv').config();

@Module({
  imports: [
    RouteModule,
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TimeoutInterceptor,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransformInterceptor,
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
