import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IKafkaAdmin, KafkaAdmin } from 'src/plugins/kafka-client';

import { getKafkaConfig } from '../kafka-client';

@Controller()
export class AdminController {
  constructor(
    private readonly configService: ConfigService,
    @KafkaAdmin() private readonly kafkaAdmin: IKafkaAdmin,
  ) {}

  @Get()
  @Render('admin/index.hbs')
  async admin() {
    const {
      options: { client: kafkaClient },
    } = getKafkaConfig(this.configService);
    const topics = await this.kafkaAdmin.listTopics();
    return { kafkaClient, topics };
  }
}
