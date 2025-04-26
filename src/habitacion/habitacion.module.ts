import { Module } from '@nestjs/common';
import { HabitacionService } from './habitacion.service';
import { HabitacionController } from './habitacion.controller';
import { Habitacion } from './entities/habitacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacion, Reserva])],
  controllers: [HabitacionController],
  providers: [HabitacionService],
})
export class HabitacionModule {}
