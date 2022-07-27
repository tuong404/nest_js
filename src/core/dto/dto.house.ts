import { IsEnum, IsInstance, IsString } from 'class-validator';

export class CreateHouseDto {
  @IsEnum(['nhà trọ', 'nhà nguyên căn', 'căn hộ'], {
    message: 'rất tiếc chúng tôi chưa hỗ trợ cho thuê loại nhà này',
  })
  @IsString()
  type: string;
  @IsString()
  adress: string;
  @IsString()
  price: string;
  picture: string;
  describe: string;
}
