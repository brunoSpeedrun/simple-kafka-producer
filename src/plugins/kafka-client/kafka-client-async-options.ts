import { ModuleMetadata } from '@nestjs/common';
import { KafkaConfig } from '@nestjs/microservices/external/kafka.interface';

export interface KafkaClientAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<KafkaConfig> | KafkaConfig;
  inject?: any[];
}
