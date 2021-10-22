import { DynamicModule, Module, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { KAFKA_ADMIN, KAFKA_PRODUCER } from './constants';
import { createAsyncProviders } from './create-async-providers';
import { KafkaClientAsyncOptions } from './kafka-client-async-options';
import { IKafkaAdmin, IKafkaProducer } from './kafka.interfaces';

@Module({})
export class KafkaClientPlugin implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  static registerAsync(options: KafkaClientAsyncOptions): DynamicModule {
    const providers = createAsyncProviders(options);

    return {
      module: KafkaClientPlugin,
      imports: options.imports,
      providers,
      exports: providers,
      global: true,
    };
  }

  async onApplicationShutdown() {
    const kafkaAdmin = this.moduleRef.get<IKafkaAdmin>(KAFKA_ADMIN);
    const kafkaProducer = this.moduleRef.get<IKafkaProducer>(KAFKA_PRODUCER);
    kafkaAdmin && (await kafkaAdmin.close());
    kafkaProducer && (await kafkaProducer.close());
  }
}
