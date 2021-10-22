import {
  Producer,
  RecordMetadata,
} from '@nestjs/microservices/external/kafka.interface';

import { IKafkaProducer } from '.';

export class DefaultKafkaProducer implements IKafkaProducer {
  constructor(private readonly producer: Producer) {}

  send(topic: string, payload: any): Promise<RecordMetadata[]> {
    return this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
  }

  async close(): Promise<void> {
    await this.producer.disconnect();
  }
}
