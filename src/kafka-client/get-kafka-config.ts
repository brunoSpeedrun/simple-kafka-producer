import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

export function getKafkaConfig(configService: ConfigService): KafkaOptions {
  const clientId = configService.get<string>('KAFKA_CLIENT_ID');
  const brokers = configService.get<string>('KAFKA_BROKERS').split(',');

  const kafkaConfig: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId,
        brokers,
        connectionTimeout: 3000,
        retry: {
          initialRetryTime: 1000,
          retries: 8,
        },
      },
    },
  };

  return kafkaConfig;
}
