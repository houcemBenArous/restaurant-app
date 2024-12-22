import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Plat } from '../../../models/plat.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plat-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './plat-list.component.html',
  styleUrls: ['./plat-list.component.css']
})
export class PlatListComponent implements OnInit {
  plats: Plat[] = [];
  filteredPlats: Plat[] = [];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  sortField: 'nom' | 'prix' = 'nom';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  get paginatedPlats() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPlats.slice(start, start + this.itemsPerPage);
  }

  // Recherche
  search(term: string | Event) {
    const searchTerm = typeof term === 'string' ? term : (term.target as HTMLInputElement).value;
    this.searchTerm = searchTerm.toLowerCase();
    this.filteredPlats = this.plats.filter(plat => 
      plat.nom.toLowerCase().includes(this.searchTerm) ||
      plat.ingredients.some(ing => ing.toLowerCase().includes(this.searchTerm))
    );
    this.currentPage = 1;
  }

  // Tri
  sort(field: 'nom' | 'prix') {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.filteredPlats.sort((a, b) => {
      const modifier = this.sortDirection === 'asc' ? 1 : -1;
      return a[field] > b[field] ? modifier : -modifier;
    });
  }

  // Navigation entre les pages
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredPlats.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlats();
  }

  loadPlats() {
    this.apiService.getPlats().subscribe(plats => {
      this.plats = plats;
      this.filteredPlats = [...plats];
    });
  }

  editPlat(plat: Plat) {
    this.router.navigate(['/plats', plat.id, 'edit']);
  }

  deletePlat(id: number | undefined) {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
      this.apiService.deletePlat(id).subscribe(() => {
        this.loadPlats();
      });
    }
  }
} 