import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CommandeService } from '../services/commande.service';
import { Commande } from '../models/commande.entity';

@Controller('commandes')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @Post()
  async create(@Body() commandeData: any): Promise<Commande> {
    try {
      return await this.commandeService.create(commandeData);
    } catch (error: any) {
      throw new HttpException(error.message || 'Erreur lors de la création de la commande', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Commande[]> {
    try {
      return await this.commandeService.findAll();
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Erreur lors de la récupération des commandes',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('statistiques')
  async getStatistiques(@Query('periode') periode: 'jour' | 'semaine' | 'mois') {
    return await this.commandeService.getStatistiques(periode);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Commande> {
    const commande = await this.commandeService.findOne(id);
    if (!commande) {
      throw new HttpException('Commande non trouvée', HttpStatus.NOT_FOUND);
    }
    return commande;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() commandeData: any): Promise<Commande> {
    try {
      return await this.commandeService.update(id, commandeData);
    } catch (error: any) {
      throw new HttpException(error.message || 'Erreur lors de la mise à jour de la commande', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    try {
      await this.commandeService.delete(id);
    } catch (error) {
      throw new HttpException('Erreur lors de la suppression de la commande', HttpStatus.BAD_REQUEST);
    }
  }
} 