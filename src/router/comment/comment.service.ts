import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  hello() {
    return `this is a comment service`;
  }
}
