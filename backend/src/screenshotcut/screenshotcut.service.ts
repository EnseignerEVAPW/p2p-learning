/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ScreenShotCut } from './screenshotcut.entity';
import {v4} from 'uuid';

@Injectable()
export class ScreenshotCutService {

    private items: ScreenShotCut[] = [{
        id: '1',
        name: 'screenshot1',
        createdAt: new Date(),
        content: '/example',
    }]

    getAllScreenshots() {
        return this.items
    }
    createScreenshot(name: string, content: string) {
        const newItem = {
            id: v4(),
            name,
            createdAt: new Date(),
            content
        }
        this.items.push(newItem)
        return newItem
     }
    uploadScreenshot(name: string, content: string) { 
        const newItem = {
            id: v4(),
            name,
            createdAt: new Date(),
            content,
        }
        this.items.push(newItem)
        return newItem
    }
    getScreenshotById(id: string): ScreenShotCut {
        return this.items.find(item => item.id === id)
    }

    updateScrenshot(id: string, updatedFields: any) : ScreenShotCut { 
        const screenImg = this.getScreenshotById(id)
        const newImg = Object.assign(screenImg, updatedFields)
        this.items = this.items.map(item => item.id === id ? newImg : item)
        return newImg;
    }

    deleteScreenshot(id: string) {
        this.items = this.items.filter(item => item.id !== id)
     }
}
