import { IsDateString, IsNotEmpty, IsArray, ArrayNotEmpty, IsPositive, IsInt } from 'class-validator';

export class CreateReservaDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  clienteId: number;

  @IsDateString()
  @IsNotEmpty()
  fechaInicio: string;

  @IsDateString()
  @IsNotEmpty()
  fechaFin: string;

  @IsArray()
  @ArrayNotEmpty()
  habitacionesIds: number[];
}
