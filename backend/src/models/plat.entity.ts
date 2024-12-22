import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Commande } from './commande.entity';

@Entity()
export class Plat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column('decimal', { precision: 10, scale: 2 })
    prix: number;

    @Column('text', { array: true })
    ingredients: string[];

    @Column()
    disponible: boolean;

    @ManyToMany(() => Commande, commande => commande.plats)
    commandes: Commande[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateCreation: Date;
} 