import express from 'express';
import { AppDataSource } from '../config/database.config.js';

const router = express.Router();
const commandeRepository = AppDataSource.getRepository("Commande");

router.get('/', async (req, res) => {
    try {
        console.log('Récupération des commandes...');
        const commandes = await commandeRepository
            .createQueryBuilder('commande')
            .leftJoinAndSelect('commande.client', 'client')
            .leftJoinAndSelect('commande.plats', 'plats')
            .getMany();
        
        console.log('Commandes trouvées:', commandes);
        res.json(commandes);
    } catch (error) {
        console.error('Erreur détaillée:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        res.status(500).json({ 
            message: error.message,
            detail: error.stack 
        });
    }
});

// GET une commande par ID
router.get('/:id', async (req, res) => {
    try {
        const commande = await commandeRepository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ['client', 'plats']
        });
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.json(commande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST nouvelle commande
router.post('/', async (req, res) => {
    try {
        console.log('Données reçues:', req.body);
        const { client_id, plat_ids, total, remise, total_apres_remise, statut } = req.body;

        const commande = await commandeRepository.create({
            client: { id: client_id },
            total,
            remise,
            total_apres_remise,
            statut
        });

        const savedCommande = await commandeRepository.save(commande);

        // Ajouter les plats à la commande
        if (plat_ids && plat_ids.length > 0) {
            savedCommande.plats = plat_ids.map(id => ({ id }));
            await commandeRepository.save(savedCommande);
        }

        res.status(201).json(savedCommande);
    } catch (error) {
        console.error('Erreur détaillée:', error);
        res.status(400).json({ message: error.message });
    }
});

// PUT mettre à jour une commande
router.put('/:id', async (req, res) => {
    try {
        const result = await commandeRepository.update(req.params.id, req.body);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        const updatedCommande = await commandeRepository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ['client', 'plats']
        });
        res.json(updatedCommande);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE supprimer une commande
router.delete('/:id', async (req, res) => {
    try {
        const result = await commandeRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 