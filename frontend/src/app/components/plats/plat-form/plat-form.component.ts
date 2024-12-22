import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Plat } from '../../../models/plat.interface';

@Component({
  selector: 'app-plat-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plat-form.component.html',
  styleUrls: ['./plat-form.component.css']
})
export class PlatFormComponent implements OnInit {
  plat: Plat = {
    nom: '',
    prix: 0,
    ingredients: [],
    disponible: true
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.apiService.getPlats().subscribe(plats => {
        const plat = plats.find(p => p.id === +id);
        if (plat) {
          this.plat = plat;
        }
      });
    }
  }

  updateIngredients(value: string) {
    this.plat.ingredients = value.split(',')
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0);
    console.log('Ingredients mis à jour:', this.plat.ingredients);
  }

  onSubmit() {
    const platToSend = {
      nom: this.plat.nom,
      prix: Number(this.plat.prix),
      ingredients: Array.isArray(this.plat.ingredients) ? this.plat.ingredients : [],
      disponible: Boolean(this.plat.disponible)
    };

    console.log('Données envoyées:', platToSend);

    if (this.plat.id) {
      this.apiService.updatePlat(this.plat.id, platToSend).subscribe({
        next: () => this.router.navigate(['/plats']),
        error: (err) => console.error('Erreur lors de la mise à jour:', err)
      });
    } else {
      this.apiService.createPlat(platToSend).subscribe({
        next: () => this.router.navigate(['/plats']),
        error: (err) => console.error('Erreur lors de la création:', err)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/plats']);
  }
} 