import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tourist',
    password: 'tourist',
    database: 'p2plearning',
    entities: [],
    synchronize: true
  }),
    AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }