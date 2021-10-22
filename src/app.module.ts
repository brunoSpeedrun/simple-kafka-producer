import { Module } from '@nestjs/common';

import { AdminModule } from './admin';
import { KafkaProducerModule } from './kafka-producer';
import { AppConfigModule } from './app-config';
import { KafkaClientModule } from './kafka-client/kafka-client.module';

@Module({
  imports: [
    AdminModule,
    KafkaProducerModule,
    AppConfigModule,
    KafkaClientModule,
  ],
})
export class AppModule {}
