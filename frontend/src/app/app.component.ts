import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <h1>Gestion Restaurant</h1>
      <nav>
        <a routerLink="/plats" routerLinkActive="active">Plats</a>
        <a routerLink="/clients" routerLinkActive="active">Clients</a>
        <a routerLink="/commandes" routerLinkActive="active">Commandes</a>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    header {
      background: #3f51b5;
      color: white;
      padding: 1rem;
    }
    nav {
      margin-top: 1rem;
    }
    nav a {
      color: white;
      text-decoration: none;
      margin-right: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    nav a:hover {
      background: rgba(255,255,255,0.1);
    }
    main {
      padding: 20px;
    }
  `]
})
export class AppComponent {}
