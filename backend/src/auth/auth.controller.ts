import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('dummy')
  getEjemplo(): string {
    return '¡dHola desde el endpoint ejemplo!';
  }
  
  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(
    @Request()
    req: any
  ) {
    return req.user;
  }

}
