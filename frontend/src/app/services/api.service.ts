import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ErrorService } from './error.service';
import { Plat } from '../models/plat.interface';
import { Client } from '../models/client.interface';
import { Commande, CreateCommandeDto } from '../models/commande.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  private handleError = (error: HttpErrorResponse) => {
    this.errorService.handleError(error);
    throw error;
  };

  // Services pour les plats
  getPlats(): Observable<Plat[]> {
    return this.http.get<Plat[]>(`${this.apiUrl}/plats`)
      .pipe(catchError(this.handleError));
  }

  createPlat(plat: Plat): Observable<Plat> {
    return this.http.post<Plat>(`${this.apiUrl}/plats`, plat)
      .pipe(catchError(this.handleError));
  }

  updatePlat(id: number, plat: Plat): Observable<Plat> {
    return this.http.put<Plat>(`${this.apiUrl}/plats/${id}`, plat)
      .pipe(catchError(this.handleError));
  }

  deletePlat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/plats/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Services pour les clients
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`)
      .pipe(catchError(this.handleError));
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client)
      .pipe(catchError(this.handleError));
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/clients/${id}`, client)
      .pipe(catchError(this.handleError));
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clients/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Services pour les commandes
  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/commandes`)
      .pipe(catchError(this.handleError));
  }

  createCommande(commande: CreateCommandeDto): Observable<Commande> {
    return this.http.post<Commande>(`${this.apiUrl}/commandes`, commande)
      .pipe(catchError(this.handleError));
  }

  updateCommande(id: number, commande: Partial<CreateCommandeDto>): Observable<Commande> {
    return this.http.put<Commande>(`${this.apiUrl}/commandes/${id}`, commande)
      .pipe(catchError(this.handleError));
  }

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/commandes/${id}`)
      .pipe(catchError(this.handleError));
  }
} 