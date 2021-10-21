import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        KAFKA_CLIENT_ID: Joi.string().required(),
        KAFKA_BROKERS: Joi.string().required(),
      }),
    }),
  ],
})
export class AppConfigModule {}
