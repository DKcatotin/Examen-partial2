// reserva/entities/reserva.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Habitacion } from '../../habitacion/entities/habitacion.entity';

@Entity()
export class Reserva {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fechaInicio: Date;
    
    @Column()
    fechaFin: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.reservas)
  cliente: Cliente;

  @ManyToMany(() => Habitacion, (habitacion) => habitacion.reservas, { eager: true })
  @JoinTable()
  habitaciones: Habitacion[];
}
