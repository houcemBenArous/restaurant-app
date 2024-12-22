import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Client } from '../../../models/client.interface';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  client: Client = {
    nom: '',
    telephone: ''
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.apiService.getClients().subscribe(clients => {
        const client = clients.find(c => c.id === +id);
        if (client) {
          this.client = client;
        }
      });
    }
  }

  onSubmit() {
    if (this.client.id) {
      this.apiService.updateClient(this.client.id, this.client).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    } else {
      this.apiService.createClient(this.client).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }
} 