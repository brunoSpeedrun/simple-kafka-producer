import { Module } from '@nestjs/common';

import { AdminModule } from './admin';
import { KafkaProducerModule } from './kafka-producer';
import { AppConfigModule } from './app-config';

@Module({
  imports: [AdminModule, KafkaProducerModule, AppConfigModule],
})
export class AppModule {}
