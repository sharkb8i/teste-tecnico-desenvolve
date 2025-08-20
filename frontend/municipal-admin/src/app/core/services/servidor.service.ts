import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Servidor } from '../models/servidor.model';

@Injectable({ providedIn: 'root' })
export class ServidorService {
  private base = '/api/servidores';
  constructor(private http: HttpClient) {}

  list(): Observable<Servidor[]> { return this.http.get<Servidor[]>(this.base); }
  create(payload: Servidor): Observable<Servidor> { return this.http.post<Servidor>(this.base, payload); }
  update(payload: Servidor): Observable<Servidor> { return this.http.put<Servidor>(`${this.base}/${payload.id}`, payload); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}