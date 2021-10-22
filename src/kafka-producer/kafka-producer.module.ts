import { Module } from '@nestjs/common';

import { KafkaProducerController } from './kafka-producer.controller';

@Module({
  controllers: [KafkaProducerController],
})
export class KafkaProducerModule {}
