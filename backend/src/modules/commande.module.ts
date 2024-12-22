import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from '../models/commande.entity';
import { CommandeController } from '../controllers/commande.controller';
import { CommandeService } from '../services/commande.service';
import { ClientModule } from './client.module';
import { PlatModule } from './plat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commande]),
    ClientModule,
    PlatModule
  ],
  controllers: [CommandeController],
  providers: [CommandeService],
  exports: [CommandeService]
})
export class CommandeModule {} 