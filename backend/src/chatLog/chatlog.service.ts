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
    uploadChatlog(name: string, content2: string) { 
        const existingItem = this.items.find(item => item.name === name);
        if(existingItem){
            console.log(existingItem)
            
            existingItem.content += "* " + content2;
            return existingItem;
        }else{
            console.log("creo que era falso");
            const newItem = {
                id: v4(),
                name,
                createdAt: new Date(),
                content: content2,
            }
            this.items.push(newItem)
            return newItem
        }
    }
    getChatlogById(id: string): ChatLog {
        return this.items.find(item => item.id === id)
    }

    updateChatlog(id: string, updatedFields: any) : ChatLog { 
        const itemchat = this.getChatlogById(id)
        if(itemchat){
            itemchat.content += "* " + updatedFields.content;
            return itemchat; 
        }else{
            const newImg = Object.assign(itemchat, updatedFields)
            this.items = this.items.map(item => item.id === id ? newImg : item)
            return newImg;
        }
        
    }

    deleteChatlog(id: string) {
        this.items = this.items.filter(item => item.id !== id)
     }
}
