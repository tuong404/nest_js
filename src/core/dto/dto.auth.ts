import { Exclude } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsEmail,
  Min,
  Length,
} from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({
    message: 'Username không được để trống',
  })
  username: any;

  @IsNotEmpty({
    message: 'Password không được để trống',
  })
  @MinLength(6, {
    message: 'mật khẩu phải có ít nhất 6 ký tự và phải là 1 chuỗi',
  })
  password: any;

  @IsEmail({}, { message: 'email không hợp lệ' })
  @IsNotEmpty({
    message: 'email không được để trống',
  })
  email: string;

  @IsString({
    message: 'tên không hợp lệ, không được bao gồm số hoặc ký tự đặc biệt',
  })
  fullname: string;
}

export class AuthLogin {
  @IsNotEmpty({
    message: 'tài khoản không được để trống',
  })
  username: any;

  @IsNotEmpty({
    message: 'mật khẩu không được để trống',
  })
  @MinLength(6, {
    message: 'mật khẩu phải có ít nhất 6 ký tự và phải là 1 chuỗi',
  })
  password: any;
}
