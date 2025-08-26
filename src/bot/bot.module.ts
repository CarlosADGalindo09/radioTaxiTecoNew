import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { HttpService } from '@nestjs/axios';

@Module({
  imports:[HttpService],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
