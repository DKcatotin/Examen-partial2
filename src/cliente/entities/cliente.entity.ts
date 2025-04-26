import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from '../../reserva/entities/reserva.entity';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @OneToMany(() => Reserva, (reserva) => reserva.cliente)
  reservas: Reserva[];
}
