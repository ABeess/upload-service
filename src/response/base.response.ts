import { HttpStatus } from '@nestjs/common';

export class BaseResponse {
  public data: any;
  public status: number;
  public message: string;
  constructor(response: Partial<BaseResponse>) {
    this.status = response?.status || HttpStatus.OK;
    this.message = response?.message || 'success';
    this.data = response?.data || null;
  }
}
