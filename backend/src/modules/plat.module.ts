import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plat } from '../models/plat.entity';
import { PlatController } from '../controllers/plat.controller';
import { PlatService } from '../services/plat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plat])],
  controllers: [PlatController],
  providers: [PlatService],
  exports: [PlatService]
})
export class PlatModule {} 