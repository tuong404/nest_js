import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedbackService {
  hello() {
    return `this is a feedback service`;
  }
}
