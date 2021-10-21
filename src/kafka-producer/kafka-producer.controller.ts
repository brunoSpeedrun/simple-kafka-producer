import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { KAFKA_PRODUCER_CLIENT, X_KAFKA_TOPIC_HEADER } from './constants';

type KafkaPayloadDto = {
  payload: any;
};

@Controller('api')
export class KafkaProducerController {
  constructor(
    @Inject(KAFKA_PRODUCER_CLIENT) private readonly kafkaClient: ClientKafka,
  ) {}

  @Post('publish-to-kafka')
  @HttpCode(HttpStatus.ACCEPTED)
  publishToKafka(
    @Body() body: KafkaPayloadDto,
    @Headers(X_KAFKA_TOPIC_HEADER) kafkaTopic: string,
  ) {
    return this.kafkaClient.emit(kafkaTopic, body.payload);
  }
}
