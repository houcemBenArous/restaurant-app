import { Routes } from '@angular/router';
import { PlatListComponent } from './components/plats/plat-list/plat-list.component';
import { PlatFormComponent } from './components/plats/plat-form/plat-form.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { ClientFormComponent } from './components/clients/client-form/client-form.component';
import { CommandeListComponent } from './components/commandes/commande-list/commande-list.component';
import { CommandeFormComponent } from './components/commandes/commande-form/commande-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/plats', pathMatch: 'full' },
  { path: 'plats', component: PlatListComponent },
  { path: 'plats/nouveau', component: PlatFormComponent },
  { path: 'plats/:id/edit', component: PlatFormComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/nouveau', component: ClientFormComponent },
  { path: 'clients/:id/edit', component: ClientFormComponent },
  { path: 'commandes', component: CommandeListComponent },
  { path: 'commandes/nouveau', component: CommandeFormComponent },
  { path: 'commandes/:id/edit', component: CommandeFormComponent }
]; 