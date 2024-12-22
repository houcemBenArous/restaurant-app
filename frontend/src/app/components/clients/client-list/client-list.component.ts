import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Client } from '../../../models/client.interface';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  sortField: 'nom' | 'telephone' = 'nom';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.apiService.getClients().subscribe(clients => {
      this.clients = clients;
      this.filteredClients = [...clients];
    });
  }

  search(term: string | Event) {
    const searchTerm = typeof term === 'string' ? term : (term.target as HTMLInputElement).value;
    this.searchTerm = searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(client => 
      client.nom.toLowerCase().includes(this.searchTerm) ||
      client.telephone.includes(this.searchTerm)
    );
    this.currentPage = 1;
  }

  get paginatedClients() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredClients.slice(start, start + this.itemsPerPage);
  }

  sort(field: 'nom' | 'telephone') {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.filteredClients.sort((a, b) => {
      const modifier = this.sortDirection === 'asc' ? 1 : -1;
      return a[field] > b[field] ? modifier : -modifier;
    });
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredClients.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  editClient(client: Client) {
    this.router.navigate(['/clients', client.id, 'edit']);
  }

  deleteClient(id: number | undefined) {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.apiService.deleteClient(id).subscribe(() => {
        this.loadClients();
      });
    }
  }
} 