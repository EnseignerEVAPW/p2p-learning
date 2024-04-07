/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';

@Controller('screenschootcut')
export class ScreenshotCutController {
    @Get()
    helloWorld() {
        return 'Hello World!';
    }
}
