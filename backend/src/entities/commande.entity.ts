import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Client } from './client.entity';
import { Plat } from './plat.entity';

@Entity('commandes')
export class Commande {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, client => client.commandes)
    client: Client;

    @ManyToMany(() => Plat, plat => plat.commandes)
    @JoinTable({
        name: 'commande_plats',
        joinColumn: { name: 'commande_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'plat_id', referencedColumnName: 'id' }
    })
    plats: Plat[];

    @Column('decimal')
    total: number;

    @Column('decimal')
    remise: number;

    @Column('decimal')
    totalApresRemise: number;

    @Column()
    statut: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateCommande: Date;
} 