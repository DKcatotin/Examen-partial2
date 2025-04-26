import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from './entities/habitacion.entity';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';

@Injectable()
export class HabitacionService {
  constructor(
    @InjectRepository(Habitacion)
    private readonly habitacionRepository: Repository<Habitacion>,
  ) {}

  create(createHabitacionDto: CreateHabitacionDto) {
    const nuevaHabitacion = this.habitacionRepository.create(createHabitacionDto);
    return this.habitacionRepository.save(nuevaHabitacion);
  }

  findAll() {
    return this.habitacionRepository.find();
  }

  findOne(id: number) {
    return this.habitacionRepository.findOne({ where: { id } });
  }

  updatePut(id: number, updateHabitacionDto: UpdateHabitacionDto) {
    return this.habitacionRepository.update(id, updateHabitacionDto);
  }

  updatePatch(id: number, updateHabitacionDto: UpdateHabitacionDto) {
    return this.habitacionRepository.update(id, updateHabitacionDto);
  }

  remove(id: number) {
    return this.habitacionRepository.delete(id);
  }
}
