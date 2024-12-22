import { Commande } from './commande.interface';

export interface Client {
    id?: number;
    nom: string;
    telephone: string;
    commandes?: Commande[];
} 