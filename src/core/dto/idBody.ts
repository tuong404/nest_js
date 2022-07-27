import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class idBody {
  @IsMongoId({ message: 'dinh dang id ko hop le' })
  id: string;
}
