/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CodeforcesService } from './codeforces/codeforces.service';
import { CodeforcesController } from './codeforces/codeforces.controller';
import { ChatLogModule } from './chatLog/chatlog.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tourist',    //change  
    password: 'tourist',   //change
    database: 'p2plearning',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,

  }),
    AuthModule,
    ChatLogModule,
    ImagesModule
    ],
    controllers: [CodeforcesController],
    providers: [CodeforcesService],
})
export class AppModule { }