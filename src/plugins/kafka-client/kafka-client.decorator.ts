import { Inject } from '@nestjs/common';

import { KAFKA_ADMIN, KAFKA_PRODUCER } from './constants';

export const KafkaAdmin = () => Inject(KAFKA_ADMIN);
export const KafkaProducer = () => Inject(KAFKA_PRODUCER);
