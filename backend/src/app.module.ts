import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CodeforcesService } from './codeforces/codeforces.service';
import { CodeforcesController } from './codeforces/codeforces.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tourist',
    password: 'tourist',
    database: 'p2plearning',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,

  }),
    AuthModule
    ],
    controllers: [CodeforcesController],
    providers: [CodeforcesService],
})
export class AppModule { }