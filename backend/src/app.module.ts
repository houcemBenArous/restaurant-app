import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { PlatModule } from './modules/plat.module';
import { ClientModule } from './modules/client.module';
import { CommandeModule } from './modules/commande.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        PlatModule,
        ClientModule,
        CommandeModule
    ],
})
export class AppModule {} 