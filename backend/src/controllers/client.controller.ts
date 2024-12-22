import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.entity';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() clientData: Partial<Client>): Promise<Client> {
    try {
      return await this.clientService.create(clientData);
    } catch (error) {
      throw new HttpException('Erreur lors de la création du client', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Client> {
    const client = await this.clientService.findOne(id);
    if (!client) {
      throw new HttpException('Client non trouvé', HttpStatus.NOT_FOUND);
    }
    return client;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() clientData: Partial<Client>): Promise<Client> {
    try {
      return await this.clientService.update(id, clientData);
    } catch (error) {
      throw new HttpException('Erreur lors de la mise à jour du client', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    try {
      await this.clientService.delete(id);
    } catch (error) {
      throw new HttpException('Erreur lors de la suppression du client', HttpStatus.BAD_REQUEST);
    }
  }
} 