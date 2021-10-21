import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { getKafkaConfig } from './get-kafka-config';

export function startKafka(app: INestApplication) {
  const configService = app.get(ConfigService);
  const kafkaConfig = getKafkaConfig(configService);

  app.connectMicroservice(kafkaConfig);
}
