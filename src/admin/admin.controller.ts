import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Render,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IKafkaAdmin, KafkaAdmin } from 'src/plugins/kafka-client';

import { getKafkaConfig } from '../kafka-client';

type CreateTopicDto = {
  topicName: string;
};

@Controller('admin')
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

  @Post('create-topic')
  async createTopic(@Body() { topicName }: CreateTopicDto) {
    const created = await this.kafkaAdmin.createTopic(topicName);
    if (created) {
      return { created };
    }

    throw new BadRequestException(`Topic ${topicName} already exists`);
  }
}
