import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Client } from './client.entity';
import { Plat } from './plat.entity';

@Entity()
export class Commande {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, client => client.commandes)
    client: Client;

    @ManyToMany(() => Plat, plat => plat.commandes)
    @JoinTable()
    plats: Plat[];

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    remise: number;

    @Column('decimal', { precision: 10, scale: 2 })
    totalApresRemise: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateCommande: Date;

    @Column({ default: 'en_attente' })
    statut: string; // en_attente, en_preparation, terminee, livree
} 