/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors, Post, Get, UploadedFile, HttpException, HttpStatus, Res, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/images.helper';
import { ImagesService } from './images.service';
import { join } from 'path';
import { Response } from 'express';

@Controller('images')
export class ImagesController {

    constructor(private readonly imagesService: ImagesService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload',
            filename: renameImage
        }),
        fileFilter: fileFilter
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any>{
       const savedImage = await this.imagesService.create({filename : file.filename})
       if(!savedImage) {
        throw new HttpException('No se guardo imagen', HttpStatus.BAD_REQUEST);
       }

       return{
        message: 'Imagen guardada',
        data: savedImage
       }
    };

    @Get()
    async getAllImages(): Promise<any>{
        return this.imagesService.findAll();
    }

    @Get(':imgname')
    getImage(@Res() res: Response, @Param('imgname') imgname: string) {
        const imagePath = join(__dirname, '..','..', 'uploads', imgname);
        res.sendFile(imagePath);
    }
}
