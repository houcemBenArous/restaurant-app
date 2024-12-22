import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Commande } from './commande.entity';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    telephone: string;

    @OneToMany(() => Commande, commande => commande.client)
    commandes: Commande[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateCreation: Date;
} 