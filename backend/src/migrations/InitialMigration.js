export class InitialMigration {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE plats (
                id SERIAL PRIMARY KEY,
                nom VARCHAR(255) NOT NULL,
                prix DECIMAL(10,2) NOT NULL,
                ingredients TEXT[],
                disponible BOOLEAN DEFAULT true
            );

            CREATE TABLE clients (
                id SERIAL PRIMARY KEY,
                nom VARCHAR(255) NOT NULL,
                telephone VARCHAR(20) NOT NULL
            );

            CREATE TABLE commandes (
                id SERIAL PRIMARY KEY,
                client_id INTEGER NOT NULL,
                total DECIMAL(10,2) NOT NULL,
                remise DECIMAL(10,2) DEFAULT 0,
                total_apres_remise DECIMAL(10,2) NOT NULL,
                statut VARCHAR(50) DEFAULT 'en_attente',
                date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES clients(id)
            );

            CREATE TABLE commande_plats (
                commande_id INTEGER NOT NULL,
                plat_id INTEGER NOT NULL,
                PRIMARY KEY (commande_id, plat_id),
                CONSTRAINT fk_commande FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
                CONSTRAINT fk_plat FOREIGN KEY (plat_id) REFERENCES plats(id) ON DELETE CASCADE
            );
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS commande_plats;
            DROP TABLE IF EXISTS commandes;
            DROP TABLE IF EXISTS clients;
            DROP TABLE IF EXISTS plats;
        `);
    }
} 