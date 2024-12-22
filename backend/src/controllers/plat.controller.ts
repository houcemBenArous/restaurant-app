import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { PlatService } from '../services/plat.service';
import { Plat } from '../models/plat.entity';

@Controller('plats')
export class PlatController {
  constructor(private readonly platService: PlatService) {}

  @Post()
  async create(@Body() platData: Partial<Plat>): Promise<Plat> {
    try {
      return await this.platService.create(platData);
    } catch (error) {
      throw new HttpException('Erreur lors de la création du plat', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Plat[]> {
    return await this.platService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Plat> {
    const plat = await this.platService.findOne(id);
    if (!plat) {
      throw new HttpException('Plat non trouvé', HttpStatus.NOT_FOUND);
    }
    return plat;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() platData: Partial<Plat>): Promise<Plat> {
    try {
      return await this.platService.update(id, platData);
    } catch (error) {
      throw new HttpException('Erreur lors de la mise à jour du plat', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    try {
      await this.platService.delete(id);
    } catch (error) {
      throw new HttpException('Erreur lors de la suppression du plat', HttpStatus.BAD_REQUEST);
    }
  }
} 