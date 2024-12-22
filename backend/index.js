import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { AppDataSource } from "./src/config/database.config.js";
import platRoutes from './src/routes/plat.routes.js';
import clientRoutes from './src/routes/client.routes.js';
import commandeRoutes from './src/routes/commande.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialisation de la base de données
AppDataSource.initialize()
    .then(() => {
        console.log("Base de données connectée");
        
        // Routes
        app.use('/plats', platRoutes);
        app.use('/clients', clientRoutes);
        app.use('/commandes', commandeRoutes);

        // Démarrage du serveur
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erreur de connexion à la base de données:", error);
        process.exit(1);
    }); 