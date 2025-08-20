import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'servidores', pathMatch: 'full' },
  { path: 'secretarias', loadComponent: () => import('./features/secretarias/secretaria-list/secretaria-list.component').then(m => m.SecretariaListComponent) },
  { path: 'secretarias/new', loadComponent: () => import('./features/secretarias/secretaria-form/secretaria-form.component').then(m => m.SecretariaFormComponent) },
  { path: 'servidores', loadComponent: () => import('./features/servidores/servidor-list/servidor-list.component').then(m => m.ServidorListComponent) },
  { path: 'servidores/new', loadComponent: () => import('./features/servidores/servidor-form/servidor-form.component').then(m => m.ServidorFormComponent) },
];