import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '@/modules/users/schemas/user.schema';
import { Category } from '@/modules/categories/schemas/category.schema';
import { Tag } from '@/modules/tags/schemas/tag.schema';
import { Media } from '@/modules/medias/schemas/media.schema';

export type ArticleDocument = HydratedDocument<Article>;

/**
 * Trạng thái bài viết:
 * - draft: nháp
 * - pending_review: chờ duyệt
 * - published: đã xuất bản
 * - archived: đã gỡ / lưu trữ
 */
export enum ArticleStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Schema({
  timestamps: true, // Tự động thêm createdAt, updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Article {
  // ==============================
  // 🧱 Thông tin cơ bản
  // ==============================

  @Prop({ required: [true, 'Tiêu đề là bắt buộc'], trim: true })
  title: string;

  @Prop({
    required: [true, 'Slug là bắt buộc'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  slug: string; // Dùng để định danh URL thân thiện

  @Prop({ trim: true })
  excerpt: string; // Đoạn tóm tắt ngắn hiển thị ở trang danh sách

  @Prop({ required: [true, 'Nội dung là bắt buộc'] })
  content: string; // Nội dung chính (HTML / Markdown)

  @Prop({
    type: String,
    enum: ArticleStatus,
    default: ArticleStatus.DRAFT,
    index: true,
  })
  status: ArticleStatus;

  @Prop({ default: 0 })
  views: number; // Đếm lượt xem

  @Prop({ type: Date, default: null })
  publishedAt: Date; // Thời điểm xuất bản (dùng cho SEO + sắp xếp)

  // ==============================
  // 🔗 Liên kết
  // ==============================

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Tác giả là bắt buộc'],
  })
  author: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Danh mục là bắt buộc'],
  })
  category: Category;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    default: [],
  })
  tags: Tag[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    default: null,
  })
  featuredImage: Media; // Ảnh đại diện chính (Open Graph + SEO)

  // ==============================
  // 🔍 SEO & Tối ưu hiển thị
  // ==============================

  @Prop({ trim: true })
  metaTitle: string; // Tiêu đề SEO (fallback: title)

  @Prop({ trim: true })
  metaDescription: string; // Mô tả SEO (fallback: excerpt)

  @Prop({ trim: true })
  metaKeywords: string; // Từ khóa SEO (ngăn cách bằng dấu phẩy)

  @Prop({ trim: true })
  canonicalUrl: string; // URL gốc chống duplicate content

  @Prop({
    type: Object,
    default: {},
  })
  openGraph: {
    title?: string;
    description?: string;
    image?: string;
    type?: string; // article / website
  }; // Dữ liệu hiển thị khi share mạng xã hội

  @Prop({
    type: Object,
    default: {},
  })
  schemaJson: Record<string, any>; // JSON-LD (schema.org) cho SEO nâng cao

  // ==============================
  // 🧮 Hệ thống đánh giá SEO (tùy chọn)
  // ==============================

  @Prop({ type: Number, default: 0, min: 0, max: 100 })
  seoScore: number; // Điểm SEO tự động tính khi lưu

  // ==============================
  // ⚙️ Tự động sinh trường ảo (virtuals)
  // ==============================

  // Tạo URL động (dựa vào slug)
  get url(): string {
    return `/bai-viet/${this.slug}`;
  }
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

// ==============================
// 🧠 Index & Search
// ==============================

// Full-text search trên tiêu đề, slug, mô tả
ArticleSchema.index(
  { title: 'text', slug: 'text', excerpt: 'text', metaDescription: 'text' },
  {
    weights: { title: 10, slug: 5, metaDescription: 4 },
    name: 'search_index',
  },
);

// Tối ưu filter
ArticleSchema.index({ category: 1 });
ArticleSchema.index({ tags: 1 });
ArticleSchema.index({ status: 1 });
ArticleSchema.index({ publishedAt: -1 });
