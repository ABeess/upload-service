import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UploadDocument = HydratedDocument<Upload>;

@Schema({
  timestamps: true,
})
export class Upload {
  @Prop({
    type: String,
    default: '',
  })
  url: string;

  @Prop({
    type: String,
    default: '',
  })
  mimetype: string;

  @Prop({
    type: Number,
    default: 0,
  })
  type: number;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
