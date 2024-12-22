import { EntitySchema } from 'typeorm';

export const Plat = new EntitySchema({
    name: "Plat",
    tableName: "plats",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nom: {
            type: "varchar"
        },
        prix: {
            type: "decimal"
        },
        ingredients: {
            type: "simple-array"
        },
        disponible: {
            type: "boolean",
            default: true
        }
    },
    relations: {
        commandes: {
            target: "Commande",
            type: "many-to-many",
            inverseSide: "plats"
        }
    }
}); 