import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
    <button mat-button routerLink="/servidores">Servidores</button>
    <button mat-button routerLink="/secretarias">Secretarias</button>
    <span class="spacer"></span>
    <a mat-icon-button href="https://angular.io/" target="_blank" aria-label="Angular"><mat-icon>link</mat-icon></a>
    </mat-toolbar>
    
    <app-loading-overlay></app-loading-overlay>

    <main class="container">
    <router-outlet></router-outlet>
    </main>
  `,
  styles: [`.container{padding:16px;max-width:1200px;margin:0 auto}.spacer{flex:1}`]
})
export class AppComponent {}