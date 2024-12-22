import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from '../models/commande.entity';
import { ClientService } from './client.service';
import { PlatService } from './plat.service';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
    private clientService: ClientService,
    private platService: PlatService
  ) {}

  async create(commandeData: any): Promise<Commande> {
    const client = await this.clientService.findOne(commandeData.clientId);
    if (!client) {
      throw new HttpException('Client non trouvé', HttpStatus.NOT_FOUND);
    }

    const plats = await Promise.all(
      commandeData.platIds.map(id => this.platService.findOne(id))
    );

    if (plats.some(plat => !plat)) {
      throw new HttpException('Un ou plusieurs plats non trouvés', HttpStatus.NOT_FOUND);
    }

    const total = plats.reduce((sum, plat) => sum + Number(plat.prix), 0);
    const remise = this.calculateRemise(total);
    const totalApresRemise = total - remise;

    const commande = this.commandeRepository.create({
      client,
      plats,
      total,
      remise,
      totalApresRemise,
      statut: 'en_attente'
    });

    return await this.commandeRepository.save(commande);
  }

  private calculateRemise(total: number): number {
    if (total >= 100) return total * 0.15;      // 15% pour les commandes de 100€ ou plus
    if (total >= 50) return total * 0.10;       // 10% pour les commandes de 50€ ou plus
    if (total >= 30) return total * 0.05;       // 5% pour les commandes de 30€ ou plus
    return 0;
  }

  async findAll(): Promise<Commande[]> {
    return await this.commandeRepository.find({
      relations: ['client', 'plats']
    });
  }

  async findOne(id: number): Promise<Commande> {
    return await this.commandeRepository.findOne({
      where: { id },
      relations: ['client', 'plats']
    });
  }

  async update(id: number, commandeData: any): Promise<Commande> {
    const commande = await this.findOne(id);
    if (!commande) {
      throw new HttpException('Commande non trouvée', HttpStatus.NOT_FOUND);
    }

    if (commandeData.statut) {
      commande.statut = commandeData.statut;
    }

    return await this.commandeRepository.save(commande);
  }

  async delete(id: number): Promise<void> {
    await this.commandeRepository.delete(id);
  }

  async getStatistiques(periode: 'jour' | 'semaine' | 'mois'): Promise<any> {
    const dateDebut = new Date();
    switch (periode) {
      case 'jour':
        dateDebut.setHours(0, 0, 0, 0);
        break;
      case 'semaine':
        dateDebut.setDate(dateDebut.getDate() - 7);
        break;
      case 'mois':
        dateDebut.setMonth(dateDebut.getMonth() - 1);
        break;
    }

    const commandes = await this.commandeRepository.find({
      where: {
        dateCommande: dateDebut
      },
      relations: ['plats']
    });

    const chiffreAffaires = commandes.reduce((sum, cmd) => sum + Number(cmd.totalApresRemise), 0);

    return {
      chiffreAffaires,
      nombreCommandes: commandes.length,
      periode
    };
  }
} 