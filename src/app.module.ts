import { Module } from '@nestjs/common';

import { AdminModule } from '@simple-kafka-producer/admin';
import { KafkaProducerModule } from '@simple-kafka-producer/kafka-producer';
import { AppConfigModule } from '@simple-kafka-producer/app-config';
import { KafkaClientModule } from '@simple-kafka-producer/kafka-client/kafka-client.module';

@Module({
  imports: [
    AdminModule,
    KafkaProducerModule,
    AppConfigModule,
    KafkaClientModule,
  ],
})
export class AppModule {}
