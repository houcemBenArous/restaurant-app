import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <a routerLink="/plats" routerLinkActive="active">Plats</a>
      <a routerLink="/clients" routerLinkActive="active">Clients</a>
      <a routerLink="/commandes" routerLinkActive="active">Commandes</a>
    </nav>
  `
})
export class NavComponent {} 