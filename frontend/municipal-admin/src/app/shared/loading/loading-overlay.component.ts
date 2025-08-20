import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="overlay" *ngIf="loadingSvc.loading$ | async">
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    </div>
  `,
  styles: [`
    .overlay { position: fixed; inset: 0; display: grid; place-items: center;
    background: rgba(0,0,0,0.25); z-index: 1000; }
  `]
})
export class LoadingOverlayComponent {
  constructor(public loadingSvc: LoadingService) {}
}