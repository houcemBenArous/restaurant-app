import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plat } from '../models/plat.entity';

@Injectable()
export class PlatService {
  constructor(
    @InjectRepository(Plat)
    private platRepository: Repository<Plat>
  ) {}

  async create(platData: Partial<Plat>): Promise<Plat> {
    const plat = this.platRepository.create(platData);
    return await this.platRepository.save(plat);
  }

  async findAll(): Promise<Plat[]> {
    return await this.platRepository.find();
  }

  async findOne(id: number): Promise<Plat> {
    return await this.platRepository.findOne({ where: { id } });
  }

  async update(id: number, platData: Partial<Plat>): Promise<Plat> {
    await this.platRepository.update(id, platData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.platRepository.delete(id);
  }
} 