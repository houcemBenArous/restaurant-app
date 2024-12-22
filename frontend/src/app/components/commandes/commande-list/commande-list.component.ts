import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Commande, StatutCommande } from '../../../models/commande.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-commande-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DecimalPipe],
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit {
  commandes: Commande[] = [];
  filteredCommandes: Commande[] = [];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  sortField: 'dateCommande' | 'total' | 'statut' = 'dateCommande';
  sortDirection: 'asc' | 'desc' = 'desc';
  statutOptions = ['en_attente', 'en_preparation', 'terminee', 'livree'] as const;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCommandes();
  }

  loadCommandes() {
    this.apiService.getCommandes().subscribe(commandes => {
      this.commandes = commandes.map(commande => ({
        ...commande,
        totalApresRemise: commande.total - commande.remise
      }));
      this.filteredCommandes = [...this.commandes];
    });
  }

  search(term: string | Event) {
    const searchTerm = typeof term === 'string' ? term : (term.target as HTMLInputElement).value;
    this.searchTerm = searchTerm.toLowerCase();
    this.filteredCommandes = this.commandes.filter(commande => 
      commande.client.nom.toLowerCase().includes(this.searchTerm) ||
      commande.plats.some(plat => plat.nom.toLowerCase().includes(this.searchTerm)) ||
      commande.statut.includes(this.searchTerm)
    );
    this.currentPage = 1;
  }

  get paginatedCommandes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCommandes.slice(start, start + this.itemsPerPage);
  }

  sort(field: 'dateCommande' | 'total' | 'statut') {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.filteredCommandes.sort((a, b) => {
      const modifier = this.sortDirection === 'asc' ? 1 : -1;
      if (field === 'dateCommande') {
        return new Date(a[field] || 0).getTime() > new Date(b[field] || 0).getTime() ? modifier : -modifier;
      }
      return a[field] > b[field] ? modifier : -modifier;
    });
  }

  filterByStatut(statut: StatutCommande | 'tous') {
    if (statut === 'tous') {
      this.filteredCommandes = [...this.commandes];
    } else {
      this.filteredCommandes = this.commandes.filter(c => c.statut === statut);
    }
    this.currentPage = 1;
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredCommandes.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  updateStatut(commande: Commande) {
    if (commande.id) {
      const currentIndex = this.statutOptions.indexOf(commande.statut);
      const nextIndex = (currentIndex + 1) % this.statutOptions.length;
      const newStatut = this.statutOptions[nextIndex] as StatutCommande;
      
      const updateData = {
        statut: newStatut
      };

      this.apiService.updateCommande(commande.id, updateData).subscribe(() => {
        this.loadCommandes();
      });
    }
  }

  editCommande(commande: Commande) {
    this.router.navigate(['/commandes', commande.id, 'edit']);
  }

  deleteCommande(id: number | undefined) {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.apiService.deleteCommande(id).subscribe(() => {
        this.loadCommandes();
      });
    }
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'statut-attente';
      case 'en_preparation': return 'statut-preparation';
      case 'terminee': return 'statut-terminee';
      case 'livree': return 'statut-livree';
      default: return '';
    }
  }
} 