import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { HabitacionService } from './habitacion.service';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';

@Controller('habitacion')
export class HabitacionController {
  constructor(private readonly habitacionService: HabitacionService) {}

  @Post()
  create(@Body() createHabitacionDto: CreateHabitacionDto) {
    return this.habitacionService.create(createHabitacionDto);
  }

  @Get()
  findAll() {
    return this.habitacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitacionService.findOne(+id);
  }

  @Put(':id')
  updatePut(@Param('id') id: string, @Body() updateHabitacionDto: UpdateHabitacionDto) {
    return this.habitacionService.updatePut(+id, updateHabitacionDto);
  }

  @Patch(':id')
  updatePatch(@Param('id') id: string, @Body() updateHabitacionDto: UpdateHabitacionDto) {
    return this.habitacionService.updatePatch(+id, updateHabitacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitacionService.remove(+id);
  }
}
