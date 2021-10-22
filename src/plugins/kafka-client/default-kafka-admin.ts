import { Admin } from '@nestjs/microservices/external/kafka.interface';

import { IKafkaAdmin } from '.';

export class DefaultKafkaAdmin implements IKafkaAdmin {
  constructor(private readonly admin: Admin) {}

  listTopics(): Promise<string[]> {
    return this.admin.listTopics();
  }

  async close(): Promise<void> {
    await this.admin.disconnect();
  }
}
