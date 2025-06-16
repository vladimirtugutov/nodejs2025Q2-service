import { IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
