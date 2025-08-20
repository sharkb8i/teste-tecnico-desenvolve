import { Routes } from '@angular/router';
import { ServidorListComponent } from './features/servidores/servidor-list/servidor-list.component';
import { SecretariaListComponent } from './features/secretarias/secretaria-list/secretaria-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'servidores', pathMatch: 'full' },
  { path: 'servidores', component: ServidorListComponent },
  { path: 'secretarias', component: SecretariaListComponent },
];