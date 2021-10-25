import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { IKafkaProducer, KafkaProducer } from '@simple-kafka-producer/plugins/kafka-client';
import { X_KAFKA_TOPIC_HEADER } from './constants';

type KafkaPayloadDto = {
  payload: any;
};

@Controller('api')
export class KafkaProducerController {
  constructor(
    @KafkaProducer() private readonly kafkaProducer: IKafkaProducer,
  ) {}

  @Post('publish-to-kafka')
  @HttpCode(HttpStatus.ACCEPTED)
  publishToKafka(
    @Body() body: KafkaPayloadDto,
    @Headers(X_KAFKA_TOPIC_HEADER) kafkaTopic: string,
  ) {
    return this.kafkaProducer.send(kafkaTopic, body.payload);
  }
}
