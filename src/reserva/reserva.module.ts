import { Module } from '@nestjs/common';
import { ReservasService } from './reserva.service';
import { ReservasController } from './reserva.controller';
import { Reserva } from './entities/reserva.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva, Cliente, Habitacion])  
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservaModule {}
