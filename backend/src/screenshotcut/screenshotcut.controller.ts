/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Res, Delete, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ScreenshotCutService } from './screenshotcut.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('screenshotcut')
export class ScreenshotCutController {
    constructor(private screenshotService: ScreenshotCutService){}   //así podemos inyectar la clase ScreenshotCutService

    @Get()
    getAllScreenshots(){
        return this.screenshotService.getAllScreenshots()
    }

    @Post()
    createScreenshot(@Body() newScreenShot: any){  //body es json
        return this.screenshotService.createScreenshot(newScreenShot.name, newScreenShot.content)
    }

    @Delete(':id')
    deleteScreenshot(@Param('id') id: string){
        this.screenshotService.deleteScreenshot(id)
    }

    @Patch(':id')
    updateScreenshot(@Param('id') id: string, @Body() updatedItem: any){ 
        return this.screenshotService.updateScrenshot(id, updatedItem)
    }

    @Post('uploadScreenshot')
    @UseInterceptors(FileInterceptor('image'))
    async uploadScreenshot(@Body() newScreenShot: any, @UploadedFile() image, @Res() res: Response): Promise<any>{
        const newScreenshot = await this.screenshotService.uploadScreenshot(newScreenShot, image)
        return res.json(newScreenshot)
    }
}