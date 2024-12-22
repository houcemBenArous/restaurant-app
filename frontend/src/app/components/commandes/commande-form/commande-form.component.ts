import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Commande, StatutCommande, CreateCommandeDto } from '../../../models/commande.interface';
import { Client } from '../../../models/client.interface';
import { Plat } from '../../../models/plat.interface';

@Component({
  selector: 'app-commande-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.css']
})
export class CommandeFormComponent implements OnInit {
  commande: Commande = {
    client: {} as Client,
    plats: [],
    total: 0,
    remise: 0,
    totalApresRemise: 0,
    statut: 'en_attente'
  };

  clients: Client[] = [];
  platsDisponibles: Plat[] = [];
  selectedClientId: number = 0;
  selectedPlatIds: number[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadClients();
    this.loadPlats();
  }

  loadClients() {
    this.apiService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  loadPlats() {
    this.apiService.getPlats().subscribe(plats => {
      this.platsDisponibles = plats.filter(p => p.disponible);
    });
  }

  onClientSelect() {
    const client = this.clients.find(c => c.id === this.selectedClientId);
    if (client) {
      this.commande.client = client;
    }
  }

  onPlatToggle(platId: number | undefined) {
    if (platId === undefined) return;
    
    const index = this.selectedPlatIds.indexOf(platId);
    if (index === -1) {
      this.selectedPlatIds.push(platId);
    } else {
      this.selectedPlatIds.splice(index, 1);
    }
    this.commande.plats = this.platsDisponibles.filter(p => 
      p.id !== undefined && this.selectedPlatIds.includes(p.id)
    );
    this.calculateTotal();
  }

  calculateTotal() {
    const total = this.commande.plats.reduce(
      (sum, plat) => sum + Number(plat.prix), 0
    );
    
    this.commande.total = total;
    
    if (total >= 100) {
      this.commande.remise = total * 0.15;
    } else if (total >= 50) {
      this.commande.remise = total * 0.10;
    } else if (total >= 30) {
      this.commande.remise = total * 0.05;
    } else {
      this.commande.remise = 0;
    }
    
    this.commande.totalApresRemise = total - this.commande.remise;
  }

  isFormValid(): boolean {
    return (
      this.selectedClientId !== 0 && 
      this.commande.plats.length > 0 &&
      this.commande.total > 0
    );
  }

  onSubmit() {
    if (this.isFormValid()) {
      const commandeToSend: CreateCommandeDto = {
        client_id: this.selectedClientId,
        plat_ids: this.selectedPlatIds,
        total: this.commande.total,
        remise: this.commande.remise,
        total_apres_remise: this.commande.totalApresRemise,
        statut: 'en_attente'
      };

      this.apiService.createCommande(commandeToSend).subscribe({
        next: () => this.router.navigate(['/commandes']),
        error: (err) => console.error('Erreur lors de la création:', err)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/commandes']);
  }
} 