import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../models/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}

  async create(clientData: Partial<Client>): Promise<Client> {
    const client = this.clientRepository.create(clientData);
    return await this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({
      relations: ['commandes']
    });
  }

  async findOne(id: number): Promise<Client> {
    return await this.clientRepository.findOne({
      where: { id },
      relations: ['commandes']
    });
  }

  async update(id: number, clientData: Partial<Client>): Promise<Client> {
    await this.clientRepository.update(id, clientData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
} 