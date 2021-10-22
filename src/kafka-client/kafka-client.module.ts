import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { getKafkaConfig } from './get-kafka-config';
import { KafkaClientPlugin } from 'src/plugins/kafka-client';

@Module({
  imports: [
    KafkaClientPlugin.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const kafkaOptions = getKafkaConfig(configService);
        return kafkaOptions.options.client as any;
      },
    }),
  ],
})
export class KafkaClientModule {}
