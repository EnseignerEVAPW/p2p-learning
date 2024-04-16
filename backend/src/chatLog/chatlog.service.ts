/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ChatLog } from './chatlog.entity';
import {v4} from 'uuid';

@Injectable()
export class ChatLogService {

    private items: ChatLog[] = [{
        id: '1',
        name: 'chatlog1',
        createdAt: new Date(),
        content: '/example',
    }]

    getAllChatlog() {
        return this.items
    }
    createChatlog(name: string, content: string) {
        const newItem = {
            id: v4(),
            name,
            createdAt: new Date(),
            content
        }
        this.items.push(newItem)
        return newItem
     }
    uploadChatlog(name: string, content: string) { 
        const newItem = {
            id: v4(),
            name,
            createdAt: new Date(),
            content,
        }
        this.items.push(newItem)
        return newItem
    }
    getChatlogById(id: string): ChatLog {
        return this.items.find(item => item.id === id)
    }

    updateScrenshot(id: string, updatedFields: any) : ChatLog { 
        const screenImg = this.getChatlogById(id)
        const newImg = Object.assign(screenImg, updatedFields)
        this.items = this.items.map(item => item.id === id ? newImg : item)
        return newImg;
    }

    deleteChatlog(id: string) {
        this.items = this.items.filter(item => item.id !== id)
     }
}
