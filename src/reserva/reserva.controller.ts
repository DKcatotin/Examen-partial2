import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ParseIntPipe, Patch } from '@nestjs/common';
import { ReservasService } from '../reserva/reserva.service';
import { CreateReservaDto } from '../reserva/dto/create-reserva.dto';
import { UpdateReservaDto } from '../reserva/dto/update-reserva.dto';
import { ValidateHabitacionesPipe } from '../pipes/validate-habitaciones.pipe';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
@UsePipes(ValidateHabitacionesPipe)
create(@Body() createReservaDto: CreateReservaDto) {
  return this.reservasService.create(createReservaDto);
}
  @Get()
  findAll() {
    return this.reservasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservasService.findOne(id);
  }

  @Put(':id')
  @UsePipes(ValidateHabitacionesPipe)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservasService.update(id, updateReservaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservasService.remove(id);
  }
  @Patch(':id')
  async patch(@Param('id') id: number, @Body() updateReservaDto: UpdateReservaDto) {
  return this.reservasService.patch(id, updateReservaDto);
}

}
