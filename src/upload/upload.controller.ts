import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BaseResponse } from '../response/base.response';
import { UploadService } from './upload.service';
import { ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { ApiFile, ApiMultiFile } from '../decorator/ApiUploadFile';
import { UploadMultipleResponse, UploadSingleResponse } from './reponse/upload.response';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload/single')
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    description: 'The upload',
    type: UploadSingleResponse,
  })
  async uploadSingleFiles(@UploadedFile() file: Express.Multer.File) {
    const data = await this.uploadService.uploadFile(file);
    return new BaseResponse({ data });
  }

  @Post('upload/multiple')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @ApiOkResponse({
    description: 'The upload',
    type: UploadMultipleResponse,
  })
  @UseInterceptors(FilesInterceptor('files', 20))
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const data = await this.uploadService.uploadMultiple(files);
    return new BaseResponse({ data });
  }
}
