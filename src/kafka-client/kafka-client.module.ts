import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { KafkaClientPlugin } from '@simple-kafka-producer/plugins/kafka-client';
import { getKafkaConfig } from './get-kafka-config';

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
