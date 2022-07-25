import { PartialType } from '@nestjs/mapped-types';
import { CreateStrangerDto } from './create-stranger.dto';

export class UpdateStrangerDto extends PartialType(CreateStrangerDto) {}
