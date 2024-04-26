import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { CodeforcesService } from "src/codeforces/codeforces.service";
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
      private readonly codeforcesService: CodeforcesService
    ) {}
  
    async register({ password, username, passwordConfirmation }: RegisterDto) {
      
      const user = await this.usersService.findOneByUsername(username);
      if (user) {
        throw new BadRequestException("username already exists");
      }
      if(password !== passwordConfirmation){
        throw new BadRequestException("passwords do not match");
      }


      const checkCE = await this.codeforcesService.checkAuthenticationName(username);
      if (!checkCE) {
        throw new BadRequestException("Authentication name is not P2P-Auth");
      }
  
      const hashedPassword = await bcryptjs.hash(password, 10);
  
      await this.usersService.create({
        username,
        password: hashedPassword,
      });
  
      return {
        message: "User created successfully",
      };
    }
    
    async login({ username, password }: LoginDto) {
      const user = await this.usersService.findOneByUsername(username);
  
      if (!user) {
        throw new UnauthorizedException("Invalid email");
      }
      
      const isPasswordValid = await bcryptjs.compare(password, user.password);
  
      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid password");
      }
      const payload = { username: user.username };
      const token = await this.jwtService.signAsync(payload);

      return {
        token: token,
        username: user.username,
      };
    }
  }
