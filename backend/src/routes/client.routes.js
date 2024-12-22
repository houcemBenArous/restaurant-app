import express from 'express';
import { AppDataSource } from '../config/database.config.js';

const router = express.Router();
const clientRepository = AppDataSource.getRepository('Client');

// GET tous les clients
router.get('/', async (req, res) => {
    try {
        console.log('Récupération des clients...');
        const clients = await clientRepository.find();
        console.log('Clients trouvés:', clients);
        res.json(clients);
    } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        res.status(500).json({ 
            message: error.message,
            detail: error.stack 
        });
    }
});

// GET un client par ID
router.get('/:id', async (req, res) => {
    try {
        const client = await clientRepository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ['commandes']
        });
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST nouveau client
router.post('/', async (req, res) => {
    try {
        const client = await clientRepository.save(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT mettre à jour un client
router.put('/:id', async (req, res) => {
    try {
        const result = await clientRepository.update(req.params.id, req.body);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        const updatedClient = await clientRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        res.json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE supprimer un client
router.delete('/:id', async (req, res) => {
    try {
        const result = await clientRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 