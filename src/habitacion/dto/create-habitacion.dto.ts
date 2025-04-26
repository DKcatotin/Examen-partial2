import { IsBoolean, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateHabitacionDto {
    @IsString()
    @IsNotEmpty()
    numero: string;
  
    @IsInt()
    @IsPositive()
    capacidad: number;
  
    @IsBoolean()
    disponible: boolean;
  }
  