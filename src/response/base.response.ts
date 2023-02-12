import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  data: any;

  @ApiProperty({
    description: 'The status of the response',
    example: 200,
  })
  status: number;

  @ApiProperty({
    description: 'The message of the response',
    example: 'success',
  })
  message: string;
  constructor(response: Partial<BaseResponse>) {
    this.status = response?.status || HttpStatus.OK;
    this.message = response?.message || 'success';
    this.data = response?.data || null;
  }
}
