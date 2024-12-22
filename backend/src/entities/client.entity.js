import { EntitySchema } from 'typeorm';

export const Client = new EntitySchema({
    name: "Client",
    tableName: "clients",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nom: {
            type: "varchar"
        },
        telephone: {
            type: "varchar"
        }
    },
    relations: {
        commandes: {
            target: "Commande",
            type: "one-to-many",
            inverseSide: "client"
        }
    }
}); 