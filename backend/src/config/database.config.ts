import { DataSource } from 'typeorm';
import { Plat } from '../entities/plat.entity';
import { Client } from '../entities/client.entity';
import { Commande } from '../entities/commande.entity';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "Restaurant",
    synchronize: true,
    logging: true,
    entities: [Plat, Client, Commande],
    subscribers: [],
    migrations: [],
}); 