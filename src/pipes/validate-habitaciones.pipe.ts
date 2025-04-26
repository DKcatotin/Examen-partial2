import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitacion } from '../habitacion/entities/habitacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ValidateHabitacionesPipe implements PipeTransform {
  constructor(
    @InjectRepository(Habitacion)
    private readonly habitacionRepository: Repository<Habitacion>,
  ) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    // Suponiendo que las habitaciones vienen como un arreglo de ids
    const habitacionesIds = value.habitaciones;
    const habitaciones = await this.habitacionRepository.findByIds(habitacionesIds);

    if (habitaciones.length !== habitacionesIds.length) {
      throw new BadRequestException('Una o más habitaciones no existen');
    }

    return value;
  }
}
