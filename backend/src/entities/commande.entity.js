import { EntitySchema } from 'typeorm';

export const Commande = new EntitySchema({
    name: "Commande",
    tableName: "commandes",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        total: {
            type: "decimal",
            precision: 10,
            scale: 2
        },
        remise: {
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0
        },
        total_apres_remise: {
            type: "decimal",
            precision: 10,
            scale: 2,
            name: "total_apres_remise"
        },
        statut: {
            type: "varchar",
            default: "en_attente"
        },
        date_commande: {
            type: "timestamp",
            name: "date_commande",
            default: () => "CURRENT_TIMESTAMP"
        }
    },
    relations: {
        client: {
            target: "Client",
            type: "many-to-one",
            joinColumn: { name: "client_id" },
            inverseSide: "commandes"
        },
        plats: {
            target: "Plat",
            type: "many-to-many",
            joinTable: {
                name: "commande_plats",
                joinColumn: { name: "commande_id" },
                inverseJoinColumn: { name: "plat_id" }
            },
            inverseSide: "commandes"
        }
    }
}); 