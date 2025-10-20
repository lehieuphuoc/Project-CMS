import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

/**
 * Schema: Vai trò (Role)
 * Dùng cho hệ thống RBAC (Role-Based Access Control)
 * 
 * - Mỗi role đại diện cho một nhóm người dùng có quyền hạn cụ thể.
 * - Ví dụ: Admin, Editor, Author, Viewer, Customer, v.v.
 */
@Schema({
  timestamps: true, // Tự động thêm createdAt, updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Role {
  // ==============================
  // 🧱 Thông tin cơ bản
  // ==============================

  @Prop({
    required: [true, 'Tên vai trò là bắt buộc'],
    unique: true,
    trim: true,
    lowercase: true, // Đảm bảo không phân biệt hoa thường (vd: "Admin" = "admin")
    index: true,     // Tăng tốc tìm kiếm
  })
  name: string; // Ví dụ: 'admin', 'editor', 'user'

  @Prop({
    trim: true,
    default: '',
  })
  displayName: string; // Tên hiển thị rõ ràng: "Quản trị viên", "Biên tập viên"

  @Prop({
    trim: true,
    default: '',
  })
  description: string; // Mô tả chi tiết quyền hạn hoặc vai trò này dùng để làm gì

  // ==============================
  // 🔑 Quyền hạn
  // ==============================

  @Prop({
    type: [String],
    default: [],
  })
  permissions: string[]; 
  /**
   * Danh sách các "key" quyền hạn dạng string (ví dụ: 'user.create', 'post.edit', 'seo.manage').
   * Mảng này giúp bạn dễ dàng kiểm tra quyền khi phân quyền thủ công hoặc kết hợp với hệ thống RBAC.
   */

  // ==============================
  // ⚙️ Các cờ đặc biệt (nếu cần)
  // ==============================

  @Prop({ default: false })
  isSystemRole: boolean; 
  /**
   * Cờ cho biết đây là role hệ thống (vd: 'admin', 'superadmin'),
   * không được xóa/sửa từ giao diện người dùng.
   */
}

export const RoleSchema = SchemaFactory.createForClass(Role);

// ==============================
// 📈 Index & tối ưu truy vấn
// ==============================

// Tạo index text để hỗ trợ tìm kiếm nhanh theo tên / mô tả
RoleSchema.index(
  { name: 'text', displayName: 'text', description: 'text' },
  {
    weights: { name: 10, displayName: 5 },
    name: 'role_search_index',
  },
);
