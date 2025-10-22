import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
  IsNumber,
} from 'class-validator';
import { AuthProvider } from '../schemas/user.schema';

// DTO dùng để tạo User
export class CreateUserDto {
  @IsNotEmpty({ message: 'Phải nhập họ tên' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsOptional()
  @Matches(/^[+]?[0-9\s()-]{7,20}$/, { message: 'Số điện thoại không hợp lệ' })
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Mật khẩu phải ít nhất 8 ký tự' })
  password: string;

  @IsOptional()
  @IsEnum(AuthProvider)
  provider?: AuthProvider;

  @IsOptional()
  @IsString()
  providerId?: string;

  @IsOptional()
  @IsString()
  role?: string; // ObjectId string
}
