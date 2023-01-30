import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class ConfigService {
  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    return {
      uri: process.env.MONGO_URI,
    };
  }
}
