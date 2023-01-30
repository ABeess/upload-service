import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload, UploadDocument } from './entities/upload.entity';
import fs from 'fs';
import { generateFileName } from '../util/generate-name';
import { CatchException } from '../util/ exception.response';

@Injectable()
export class UploadService {
  constructor(@InjectModel(Upload.name) private uploadModel: Model<UploadDocument>) {}

  async newDocument(data: Partial<Upload>) {
    return await new this.uploadModel(data).save();
  }

  async create() {
    return await this.newDocument({
      mimetype: '',
      url: 'asd',
    });
  }

  async uploadMultiple(files: Express.Multer.File[]) {
    try {
      return await Promise.all(files.map((file) => this.uploadFile(file)));
    } catch (error) {
      throw new CatchException(error);
    }
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const mimetype = file.mimetype.split('/')[0];
      const path = `public/resource/${mimetype}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }

      const fileGenerate = generateFileName(file.originalname);

      const url = `${path}/${fileGenerate.fileName}`;
      fs.writeFileSync(url, file.buffer);

      return await this.newDocument({
        type: fileGenerate.type,
        url: `/${url}`,
        mimetype,
      });
    } catch (error) {
      throw new CatchException(error);
    }
  }
}
