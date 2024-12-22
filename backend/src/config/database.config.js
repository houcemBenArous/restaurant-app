import { DataSource } from 'typeorm';
import { Plat } from '../entities/plat.entity.js';
import { Client } from '../entities/client.entity.js';
import { Commande } from '../entities/commande.entity.js';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "Restaurant",
    synchronize: false,
    logging: true,
    entities: [Plat, Client, Commande],
    subscribers: [],
    migrations: ["src/migrations/*-*.js"],
    migrationsTableName: "migrations_history"
}); 