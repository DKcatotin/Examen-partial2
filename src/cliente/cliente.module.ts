import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Reserva])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
