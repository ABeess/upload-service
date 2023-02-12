import { ApiProperty } from '@nestjs/swagger';
import { FiletypeEnum } from '../enum/filetype.enum';
import { BaseResponse } from '../../response/base.response';

export class UploadResponse {
  @ApiProperty({
    description: 'The id of the upload',
    example: '5f9f1b9b9c9d1c2b8c8b9d6a',
    type: String,
  })
  _id: string;

  @ApiProperty({
    description: 'The url of the upload',
    example: '/public/resource/image/5f9f1b9b9c9d1c2b8c8b9d6a.png',
    type: String,
  })
  url: string;

  @ApiProperty({
    description: 'The mimetype of the upload',
    example: 'image/png',
    type: String,
  })
  mimetype: string;

  @ApiProperty({
    description: 'The type of the upload. 1: image, 2: video, 3: audio, 4: file',
    example: 1,
    enum: FiletypeEnum,
  })
  type: number;

  @ApiProperty({
    description: 'The date of the upload',
    example: '2020-11-01T09:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date of the upload',
    example: '2020-11-01T09:00:00.000Z',
  })
  updatedAt: Date;

    constructor(response: any) {
    this._id = response?._id;
    this.url = response?.url;
    this.mimetype = response?.mimetype;
    this.type = response?.type;
    this.createdAt = response?.createdAt;
    this.updatedAt = response?.updatedAt;
    }

    static mapListUploadResponse(data: UploadResponse[]) {
    return data.map((item) => new UploadResponse(item));
    }
}

export class UploadSingleResponse extends BaseResponse {
  @ApiProperty({
    description: 'The upload',
    type: UploadResponse,
  })
  data: UploadResponse;
}

export class UploadMultipleResponse extends BaseResponse {
  @ApiProperty({
    description: 'The list of the upload',
    type: [UploadResponse],
  })
  data: UploadResponse[];
}
