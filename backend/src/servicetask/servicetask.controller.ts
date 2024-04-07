import { Controller, Get } from '@nestjs/common';

@Controller('servicetask')
export class ServicetaskController {
    @Get()
    helloWorld() {
        return 'Hello World!';
    }
}
