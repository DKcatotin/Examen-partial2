import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Reserva } from '../../reserva/entities/reserva.entity';

@Entity()
export class Habitacion {
    @PrimaryGeneratedColumn()
    id: number;
  @Column()
  numero: string;

  @Column()
  capacidad: number;

  @Column()
  disponible: boolean;

  @ManyToMany(() => Reserva, (reserva) => reserva.habitaciones)
  reservas: Reserva[];
}
