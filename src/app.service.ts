import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('let go....');
    return 'Hello World!';
  }
}
