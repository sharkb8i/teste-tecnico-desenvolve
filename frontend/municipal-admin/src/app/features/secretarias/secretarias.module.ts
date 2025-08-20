import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { SecretariaFormComponent } from './secretaria-form/secretaria-form.component';
import { SecretariaListComponent } from './secretaria-list/secretaria-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule, MatCardModule,
    SecretariaFormComponent, SecretariaListComponent
  ],
  exports: [SecretariaListComponent, SecretariaFormComponent]
})
export class SecretariasModule {}