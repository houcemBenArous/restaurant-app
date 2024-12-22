import "reflect-metadata";
import { AppDataSource } from "./config/database.config";
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Base de données connectée");
        
        // Vos routes API ici...

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    })
    .catch((error) => console.log(error)); 