import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { getKafkaConfig } from '../kafka-producer';

@Controller()
export class AdminController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @Render('admin/index.hbs')
  admin() {
    const {
      options: { client: kafkaClient },
    } = getKafkaConfig(this.configService);
    return { kafkaClient };
  }
}
