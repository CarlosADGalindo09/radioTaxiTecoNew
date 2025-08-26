import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Req } from '@nestjs/common';
import { BotService } from './bot.service';
import { Request } from 'express';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get()
  verifyToken(@Req() req:Request) {
    const tokenVerify=process.env.TOKEN_VERIFY;
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    //const mode = req.query['hub.mode'];

    return tokenVerify+'////'+token+'////'+challenge;
    //return this.botService.verifyToken(tokenVerify,token,challenge);
  }

  @Post()
  sendMessage(@Body() req:any) {
    const { messages }=req?.entry?.[0]?.changes?.[0]?.values ?? {};

    if(!messages){
      throw new HttpException('Error al recibir el mensaje', HttpStatus.BAD_REQUEST);//codigo 400
    }

    const { metadata }=req?.entry?.[0]?.changes?.[0]?.values ?? {};

    const idNumberUser=metadata.phone_number_id;

    const message=messages[0];
    const messageSender=message.from;
    const messageId=message.id;


    
    return this.botService.sendMessage(message,messageSender,messageId,idNumberUser);
  }

}
