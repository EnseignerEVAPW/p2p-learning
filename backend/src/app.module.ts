/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CodeforcesService } from './codeforces/codeforces.service';
import { CodeforcesController } from './codeforces/codeforces.controller';
import { ChatLogModule } from './chatLog/chatlog.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'hi28password',
    database: 'p2plearning',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,

  }),
    AuthModule,
    ChatLogModule
    ],
    controllers: [CodeforcesController],
    providers: [CodeforcesService],
})
export class AppModule { }