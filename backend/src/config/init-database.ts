import { createConnection } from 'typeorm';
import { databaseConfig } from './database.config';

async function initDatabase() {
    try {
        const connection = await createConnection(databaseConfig);
        console.log('Base de données initialisée avec succès');
        await connection.close();
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
    }
}

initDatabase(); 