import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { HabitacionModule } from './habitacion/habitacion.module';
import { ReservaModule } from './reserva/reserva.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/entities/cliente.entity';
import { Habitacion } from './habitacion/entities/habitacion.entity';
import { Reserva } from './reserva/entities/reserva.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345',
    database: 'hotel',
    entities: [Cliente, Habitacion, Reserva],  
    retryDelay:3000,
    autoLoadEntities:true,
    synchronize: true,
    }),
    ClienteModule,
    HabitacionModule,
    ReservaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
