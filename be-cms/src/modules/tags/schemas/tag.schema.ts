
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema({timestamps: true})
export class Tag {
  @Prop()
  name: string;

  @Prop()
  age: number;

  
}

export const TagSchema = SchemaFactory.createForClass(Tag);
