import { Module } from '@nestjs/common';
import { ServicetaskController } from './servicetask.controller';
import { ServicetaskService } from './servicetask.service';

@Module({
  controllers: [ServicetaskController],
  providers: [ServicetaskService],
})
export class ServicetaskModule {}
