/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Res, Delete, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ChatLogService } from './chatlog.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('chatlog')
export class ChatLogController {
    constructor(private chatlogService: ChatLogService){}   //así podemos inyectar la clase ChatlogService

    @Get()
    getAllSChatlog(){
        return this.chatlogService.getAllChatlog()
    }

    @Post()
    createChatlog(@Body() newChatLog: any){  //body es json
        return this.chatlogService.createChatlog(newChatLog.name, newChatLog.content)
    }

    @Delete(':id')
    deleteChatlog(@Param('id') id: string){
        this.chatlogService.deleteChatlog(id)
    }

    @Patch(':id')
    updateChatlog(@Param('id') id: string, @Body() updatedItem: any){ 
        return this.chatlogService.updateChatlog(id, updatedItem)
    }

    @Post('uploadChatlog')
    @UseInterceptors(FileInterceptor('image'))
    async uploadChatlog(@Body() newChatLog: any, @UploadedFile() image, @Res() res: Response): Promise<any>{
        const newChatlog = await this.chatlogService.uploadChatlog(newChatLog, image)
        return res.json(newChatlog)
    }
}