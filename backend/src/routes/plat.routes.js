import express from 'express';
import { AppDataSource } from '../config/database.config.js';

const router = express.Router();
const platRepository = AppDataSource.getRepository('Plat');

// GET tous les plats
router.get('/', async (req, res) => {
    try {
        const plats = await platRepository.find();
        res.json(plats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET un plat par ID
router.get('/:id', async (req, res) => {
    try {
        const plat = await platRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        if (!plat) {
            return res.status(404).json({ message: "Plat non trouvé" });
        }
        res.json(plat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST nouveau plat
router.post('/', async (req, res) => {
    try {
        console.log('Données reçues:', req.body);
        
        const { nom, prix, ingredients, disponible } = req.body;

        // Validation complète
        if (!nom || typeof nom !== 'string' || nom.trim().length === 0) {
            return res.status(400).json({ 
                message: "Le nom est requis et doit être une chaîne non vide"
            });
        }

        const prixNumber = Number(prix);
        if (isNaN(prixNumber) || prixNumber <= 0) {
            return res.status(400).json({ 
                message: "Le prix doit être un nombre positif"
            });
        }

        if (!Array.isArray(ingredients)) {
            return res.status(400).json({ 
                message: "Les ingrédients doivent être un tableau"
            });
        }

        // Formatage spécial pour PostgreSQL TEXT[]
        const ingredientsFormatted = `{${ingredients.map(ing => `"${ing.trim()}"`).join(',')}}`;

        // Nettoyage et validation des données
        const platToSave = {
            nom: nom.trim(),
            prix: prixNumber,
            ingredients: ingredientsFormatted,  // Format PostgreSQL pour TEXT[]
            disponible: Boolean(disponible)
        };

        console.log('Données à sauvegarder:', platToSave);

        const plat = await platRepository.save(platToSave);
        res.status(201).json(plat);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(400).json({ 
            message: error.message,
            detail: error.detail
        });
    }
});

// PUT mettre à jour un plat
router.put('/:id', async (req, res) => {
    try {
        console.log('Données reçues pour mise à jour:', req.body);
        
        const { nom, prix, ingredients, disponible } = req.body;

        // Validation et formatage
        const updateData = {};

        if (nom) {
            updateData.nom = nom.trim();
        }

        if (prix !== undefined) {
            const prixNumber = Number(prix);
            if (isNaN(prixNumber) || prixNumber <= 0) {
                return res.status(400).json({ 
                    message: "Le prix doit être un nombre positif"
                });
            }
            updateData.prix = prixNumber;
        }

        if (ingredients) {
            if (!Array.isArray(ingredients)) {
                return res.status(400).json({ 
                    message: "Les ingrédients doivent être un tableau"
                });
            }
            // Formatage spécial pour PostgreSQL TEXT[]
            updateData.ingredients = `{${ingredients.map(ing => `"${ing.trim()}"`).join(',')}}`;
        }

        if (disponible !== undefined) {
            updateData.disponible = Boolean(disponible);
        }

        console.log('Données à mettre à jour:', updateData);

        const result = await platRepository.update(req.params.id, updateData);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Plat non trouvé" });
        }

        const updatedPlat = await platRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        res.json(updatedPlat);
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        res.status(400).json({ 
            message: error.message,
            detail: error.detail 
        });
    }
});

// DELETE supprimer un plat
router.delete('/:id', async (req, res) => {
    try {
        const result = await platRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Plat non trouvé" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 