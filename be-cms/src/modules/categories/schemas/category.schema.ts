
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({timestamps: true})
export class Category {
  @Prop()
  name: string;

  @Prop()
  age: number;

  
}

export const CategorySchema = SchemaFactory.createForClass(Category);
