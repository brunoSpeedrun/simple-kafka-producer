import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

import { KafkaProducerController } from './kafka-producer.controller';
import { KAFKA_PRODUCER_CLIENT } from './constants';
import { getKafkaConfig } from './get-kafka-config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_PRODUCER_CLIENT,
        useFactory: getKafkaConfig,
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [KafkaProducerController],
})
export class KafkaProducerModule {}
