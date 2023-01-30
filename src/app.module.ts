import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigModule as NestConfig } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    NestConfig.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.createMongooseOptions(),
      inject: [ConfigService],
    }),
    UploadModule,
  ],
})
export class AppModule {}
