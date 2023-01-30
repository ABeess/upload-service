import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BaseResponse } from '../response/base.response';
import { UploadService } from './upload.service';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFiles(@UploadedFile() file: Express.Multer.File) {
    const data = await this.uploadService.uploadFile(file);
    return new BaseResponse({ data });
  }

  @Post('upload/multiple')
  @UseInterceptors(FilesInterceptor('files', 20))
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const data = await this.uploadService.uploadMultiple(files);
    return new BaseResponse({ data });
  }
}
