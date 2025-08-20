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
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ServidorFormComponent } from './servidor-form/servidor-form.component';
import { ServidorListComponent } from './servidor-list/servidor-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule, MatCardModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    ServidorListComponent, ServidorFormComponent
  ],
  exports: [ServidorListComponent, ServidorFormComponent]
})
export class ServidoresModule {}