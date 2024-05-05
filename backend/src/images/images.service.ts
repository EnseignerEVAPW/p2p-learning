/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/images.entity';
import { ImagesDto } from './dto/images-dto/images-dto';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Image)
        private imageRepository: Repository<Image>
    ){}

    async findAll(): Promise<Image[]> {
        return await this.imageRepository.find();
    }

    //async findOne(id: number): Promise<Image>{
    //    return await this.imageRepository.findOne(id);
    //}

    async create(filename: ImagesDto): Promise<Image>{   //como si fuese upload
        const image = this.imageRepository.create(filename);
        return await this.imageRepository.save(image);
    }

    //async update(id:number, filename: string):Promise<Image>{
    //    const foundImage = await this.imageRepository.findOne(id);
    //    if(!foundImage) throw new Error('Image not found');
    //    foundImage.filename = filename;
    //    return await this.imageRepository.save(foundImage);
    //}

    async remove(id:number): Promise<void>{
        await this.imageRepository.delete(id);
    }
}
