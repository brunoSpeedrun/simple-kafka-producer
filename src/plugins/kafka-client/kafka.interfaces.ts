import { RecordMetadata } from '@nestjs/microservices/external/kafka.interface';

export interface IKafkaAdmin {
  listTopics(): Promise<string[]>;
  close(): Promise<void>;
}

export interface IKafkaProducer {
  send(topic: string, payload: any): Promise<RecordMetadata[]>;
  close(): Promise<void>;
}
