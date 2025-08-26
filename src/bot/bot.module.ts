import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
