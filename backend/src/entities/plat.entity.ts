import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Commande } from './commande.entity';

@Entity('plats')
export class Plat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column('decimal')
    prix: number;

    @Column('simple-array')
    ingredients: string[];

    @Column()
    disponible: boolean;

    @ManyToMany(() => Commande, commande => commande.plats)
    commandes: Commande[];
} 