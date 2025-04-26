import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  }
  