import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// ルーティング
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ルートパス
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
