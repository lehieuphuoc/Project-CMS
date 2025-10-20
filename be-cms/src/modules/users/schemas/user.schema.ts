import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from '@/modules/roles/schemas/role.schema'; 

export type UserDocument = HydratedDocument<User>;

/**
 * Định nghĩa các nhà cung cấp (providers)
 * - local: Đăng ký bằng email/password
 * - google: Đăng ký bằng Google
 * - github: Đăng ký bằng GitHub
 */
export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  GITHUB = 'github',
}

@Schema({ 
  timestamps: true,           // Tự động thêm createdAt, updatedAt
  toJSON: { virtuals: true },     // Bật 'id' ảo khi chuyển sang JSON
  toObject: { virtuals: true }    // Bật 'id' ảo khi chuyển sang Object
})
export class User {
  @Prop({ required: [true, 'Họ và tên không được để trống'], trim: true })
  name: string;

  @Prop({ trim: true, default: null })
  avatarUrl: string; 

  @Prop({
    trim: true,
  })
  age: number;

  @Prop()
  address: string; 

  @Prop({
    required: [true, 'Email không được để trống'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Vui lòng nhập đúng định dạng email',
    ],
    index: true, // Thêm index cho email để tìm kiếm nhanh
  })
  email: string;

  @Prop({
    trim: true,
    match: [/^[+]?[0-9\s()-]{7,20}$/, 'Định dạng số điện thoại không hợp lệ'],
    unique: true,
    sparse: true, // Cho phép nhiều document có giá trị null
    index: true,  // Thêm index cho phone để tìm kiếm nhanh
  })
  phone: string;

  @Prop({
    minlength: [8, 'Mật khẩu phải có ít nhất 8 ký tự'],
    trim: true,
    select: false, // Không trả về mật khẩu khi truy vấn
  })
  password?: string; // Thêm '?' để đánh dấu là optional (không bắt buộc)

  // --- Các trường hỗ trợ Social Login ---
  @Prop({
    type: String,
    enum: AuthProvider,
    default: AuthProvider.LOCAL,
  })
  provider: AuthProvider;

  @Prop({
    type: String,
    default: null,
  })
  providerId: string;
  // --- Hết ---

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: [true, 'Vai trò là bắt buộc'],
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

// --- Các chỉ mục (Index) để tối ưu tìm kiếm ---

// Tối ưu tìm kiếm cho Social Login
// Đảm bảo (provider + providerId) là duy nhất
// nhưng bỏ qua các document có providerId là null (dùng sparse)
UserSchema.index(
  { provider: 1, providerId: 1 }, 
  { unique: true, sparse: true }
);