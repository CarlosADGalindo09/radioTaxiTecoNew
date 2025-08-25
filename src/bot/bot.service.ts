import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class BotService {

  constructor(private httpService:HttpService){}

  verifyToken(tokenVerify,token,challenge) {

    if(challenge!=null && token!=null && token==tokenVerify){
      return challenge;
    }else{
      throw new HttpException('Error al recibir el mensaje', HttpStatus.BAD_REQUEST);//codigo 400
    }
  }

  sendMessage(message,messageSender,messageId,idNumberUser) {
    
    switch(message.type){
      case 'text':
        const text= message.text.body;
        const url= `https://graph.facebook.com/${process.env.VERSION_API_WHATSAPP}/${idNumberUser}/messages`;
        const config = {
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${process.env.ACCESS_TOKEN_WHATSSAPP}`
          }
        };
        const data:string = JSON.stringify({
          messaging_product: 'whatsapp',    
          recipient_type: 'individual',
          to: messageSender,
          type: 'text',
          text: {
              preview_url: false,
              body: 'Mensaje respondido por el bot'
          }
        });

        try {
          const response = this.httpService.post(url,data,config).pipe(map((res)=>{
            return res.data;
          }));
        } catch (error) {
          throw new HttpException('Error al recibir el mensaje', HttpStatus.BAD_REQUEST);//codigo 400
        }
    }
    
  }

}
