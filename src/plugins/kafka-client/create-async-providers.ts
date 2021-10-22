import { Provider } from '@nestjs/common';

import { Kafka, KafkaConfig } from 'kafkajs';

import { KafkaClientAsyncOptions } from '.';
import {
  KAFKA_ADMIN,
  KAFKA_ADMIN_OPTIONS,
  KAFKA_CLIENT,
  KAFKA_PRODUCER,
} from './constants';
import { DefaultKafkaAdmin } from './default-kafka-admin';
import { DefaultKafkaProducer } from './default-kafka-producer';

export function createAsyncProviders(options: KafkaClientAsyncOptions) {
  const providers: Provider[] = [
    {
      provide: KAFKA_ADMIN_OPTIONS,
      inject: options.inject,
      useFactory: options.useFactory,
    },
    {
      provide: KAFKA_CLIENT,
      inject: [KAFKA_ADMIN_OPTIONS],
      useFactory: async (options: KafkaConfig) => {
        const kafka = new Kafka(options);
        return kafka;
      },
    },
    {
      provide: KAFKA_ADMIN,
      inject: [KAFKA_CLIENT],
      useFactory: async (kafkaClient: Kafka) => {
        const admin = kafkaClient.admin();
        await admin.connect();
        return new DefaultKafkaAdmin(admin);
      },
    },
    {
      provide: KAFKA_PRODUCER,
      inject: [KAFKA_CLIENT],
      useFactory: async (kafkaClient: Kafka) => {
        const producer = kafkaClient.producer();
        await producer.connect();
        return new DefaultKafkaProducer(producer);
      },
    },
  ];

  return providers;
}
