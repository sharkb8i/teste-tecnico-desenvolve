import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Secretaria } from '../models/secretaria.model';

@Injectable({ providedIn: 'root' })
export class SecretariaService {
  private base = '/api/secretarias';

  constructor(private http: HttpClient) {}

  list(): Observable<Secretaria[]> { return this.http.get<Secretaria[]>(this.base); }
  create(payload: Secretaria): Observable<Secretaria> { return this.http.post<Secretaria>(this.base, payload); }
  update(payload: Secretaria): Observable<Secretaria> { return this.http.put<Secretaria>(`${this.base}/${payload.id}`, payload); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}