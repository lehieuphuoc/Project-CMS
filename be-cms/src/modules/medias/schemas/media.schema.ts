import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MediaDocument = HydratedDocument<Media>;

/**
 * Schema Media dùng để lưu file upload (ảnh, video, tài liệu...)
 * Tối ưu SEO, dễ bảo trì, hạn chế trường thừa.
 */
@Schema({ timestamps: true })
export class Media {
  /** Tên hiển thị của file (ví dụ: Ảnh banner, Logo chính, v.v.) */
  @Prop({ required: true, trim: true })
  title: string;

  /** Tên file gốc (dạng filename thực tế khi lưu trong thư mục uploads) */
  @Prop({ required: true, trim: true })
  filename: string;

  /** Đường dẫn tuyệt đối đến file (có thể là URL hoặc path trong server) */
  @Prop({ required: true, trim: true })
  url: string;

  /** Loại file (image, video, document...) — dễ lọc trong CMS */
  @Prop({ required: true, enum: ['image', 'video', 'document'], default: 'image' })
  type: string;

  /** Kích thước file (đơn vị byte) để kiểm soát dung lượng */
  @Prop()
  size?: number;

  /** Mô tả alt text cho SEO (quan trọng với ảnh) */
  @Prop({ trim: true })
  alt?: string;

  /** Mô tả ngắn gọn về file, giúp người viết nội dung dễ quản lý */
  @Prop({ trim: true })
  description?: string;

  /** Liên kết (nếu file là ảnh liên quan bài viết, banner, v.v.) */
  @Prop({ trim: true })
  relatedTo?: string; // ví dụ: "post", "category", "user"

  /** ID bài viết hoặc danh mục liên kết */
  @Prop({ trim: true })
  relatedId?: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
