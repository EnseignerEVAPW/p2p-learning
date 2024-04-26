import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(1)
  username: string;


  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  passwordConfirmation: string;
}
