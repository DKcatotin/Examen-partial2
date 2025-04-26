import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Reserva } from '../reserva/entities/reserva.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Habitacion } from '../habitacion/entities/habitacion.entity';
import { CreateReservaDto } from '../reserva/dto/create-reserva.dto';
import { UpdateReservaDto } from '../reserva/dto/update-reserva.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Habitacion)
    private readonly habitacionRepository: Repository<Habitacion>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createReservaDto: CreateReservaDto) {
    const { clienteId, fechaInicio, fechaFin, habitacionesIds } = createReservaDto;

    // Validar que el cliente existe
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${clienteId} no encontrado.`);
    }

    // Validar que las habitaciones existen
    const habitaciones = await this.habitacionRepository.findByIds(habitacionesIds);
    if (habitaciones.length !== habitacionesIds.length) {
      throw new BadRequestException('Una o más habitaciones no existen.');
    }

    // Validar disponibilidad de habitaciones
    for (const habitacion of habitaciones) {
      const reservasExistentes = await this.reservaRepository
        .createQueryBuilder('reserva')
        .leftJoin('reserva.habitaciones', 'habitacion')
        .where('habitacion.id = :habitacionId', { habitacionId: habitacion.id })
        .andWhere('reserva.fechaInicio <= :fechaFin AND reserva.fechaFin >= :fechaInicio', {
          fechaInicio,
          fechaFin,
        })
        .getMany();

      if (reservasExistentes.length > 0) {
        throw new BadRequestException(`La habitación ${habitacion.id} no está disponible en las fechas seleccionadas.`);
      }
    }

    // Usar transacciones para asegurar la coherencia de los datos
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Crear la reserva
      const reserva = this.reservaRepository.create({
        cliente,
        fechaInicio,
        fechaFin,
        habitaciones,
      });

      // Guardar la reserva dentro de la transacción
      await queryRunner.manager.save(reserva);

      // Confirmar transacción
      await queryRunner.commitTransaction();

      return reserva;
    } catch (error) {
      // Deshacer cambios si algo falla
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('No se pudo crear la reserva debido a un error interno.');
    } finally {
      // Liberar los recursos del queryRunner
      await queryRunner.release();
    }
  }

  async findAll() {
    return this.reservaRepository.find({
      relations: ['cliente', 'habitaciones'],
    });
  }

  async findOne(id: number) {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['cliente', 'habitaciones'],
    });

    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada.`);
    }

    return reserva;
  }

  async update(id: number, updateReservaDto: UpdateReservaDto) {
    const reserva = await this.reservaRepository.findOne({ where: { id } });
    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada.`);
    }
  
    const { fechaInicio, fechaFin } = updateReservaDto;
  
    
    if (fechaInicio) {
      reserva.fechaInicio = new Date(fechaInicio);  
    }
  
    if (fechaFin) {
      reserva.fechaFin = new Date(fechaFin);  
    }
  
    return this.reservaRepository.save(reserva);
  }

  async remove(id: number) {
    const reserva = await this.reservaRepository.findOne({ where: { id } });
    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada.`);
    }

    return this.reservaRepository.remove(reserva);
  }
  async patch(id: number, updateReservaDto: UpdateReservaDto) {
    const reserva = await this.reservaRepository.findOne({ where: { id } });
    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada.`);
    }
  
    const { fechaInicio, fechaFin } = updateReservaDto;
  
    
    if (fechaInicio) {
      reserva.fechaInicio = new Date(fechaInicio);  
    }
  
    if (fechaFin) {
      reserva.fechaFin = new Date(fechaFin);  
    }
  
    return this.reservaRepository.save(reserva);
  }
}
