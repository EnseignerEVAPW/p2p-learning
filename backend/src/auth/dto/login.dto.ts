import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  @MinLength(6)
  username: string;

  
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
