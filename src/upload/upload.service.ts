import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload, UploadDocument } from './entities/upload.entity';
import fs from 'fs';
import { generateFileName } from '../util/generate-name';
import { CatchException } from '../util/ exception.response';
import { FiletypeEnum } from './enum/filetype.enum';
import {UploadResponse} from "./reponse/upload.response";

@Injectable()
export class UploadService {
  constructor(@InjectModel(Upload.name) private uploadModel: Model<UploadDocument>) {}

  async newDocument(data: Partial<Upload>) {
    return await new this.uploadModel(data).save();
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
      const fileExtension = file.mimetype.split('/')[0].toLowerCase();
      const path = `public/resource/${fileExtension}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }

      const fileGenerate = generateFileName(file.originalname);

      const url = `${path}/${fileGenerate.fileName}`;
      fs.writeFileSync(url, file.buffer);

      const newUpload = await this.newDocument({
        type: this.generateFile(fileExtension),
        url: `/${url}`,
        mimetype: file.mimetype,
      });

        return new UploadResponse(newUpload);
    } catch (error) {
      throw new CatchException(error);
    }
  }

  generateFile(mimetype: string) {
    switch (mimetype) {
      case 'image':
        return FiletypeEnum.IMAGE;
      case 'video':
        return FiletypeEnum.VIDEO;
      case 'audio':
        return FiletypeEnum.AUDIO;
      case 'file':
        return FiletypeEnum.FILE;
      default:
        return FiletypeEnum.FILE;
    }
  }
}
