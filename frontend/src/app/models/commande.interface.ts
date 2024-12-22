import { Client } from './client.interface';
import { Plat } from './plat.interface';

export type StatutCommande = "en_attente" | "en_preparation" | "terminee" | "livree";

export interface Commande {
    id?: number;
    client: Client;
    plats: Plat[];
    total: number;
    remise: number;
    totalApresRemise: number;
    statut: StatutCommande;
    dateCommande?: Date;
}

export interface CreateCommandeDto {
    client_id: number;
    plat_ids: number[];
    total: number;
    remise: number;
    total_apres_remise: number;
    statut: StatutCommande;
} 