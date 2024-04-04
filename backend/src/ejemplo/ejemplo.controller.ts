import { Controller, Get } from '@nestjs/common';

@Controller('ejemplo')
export class EjemploController {
    

  @Get('dummy')
  getEjemplo(): string {
    return '¡Hola desde el endpoint ejemplo!';
  }
}
