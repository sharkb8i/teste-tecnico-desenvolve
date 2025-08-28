import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Secretaria } from '../../../core/models/secretaria.model';
import { SecretariaService } from '../../../core/services/secretaria.service';
import { SecretariaFormComponent } from '../secretaria-form/secretaria-form.component';
import { exportToCsv } from '../../../shared/utils/csv.util';

@Component({
  selector: 'app-secretaria-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTableModule,
    SecretariaFormComponent,
  ],
  templateUrl: './secretaria-list.component.html',
  styleUrls: ['./secretaria-list.component.scss']
})
export class SecretariaListComponent implements OnInit {
  data = new MatTableDataSource<Secretaria>([]);
  cols = ['nome','sigla','acoes'];
  editing: Secretaria | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private secretarias: SecretariaService,
    private snack: MatSnackBar
  ) {}
  
  ngOnInit(){ this.load(); }
  
  load(){
    this.secretarias.list().subscribe(res => {
      this.data.data = res;
      Promise.resolve().then(() => { this.data.paginator = this.paginator; this.data.sort = this.sort; });
      this.editing = null;
    });
  }
  edit(row: Secretaria){ this.editing = { ...row }; }
  remove(row: Secretaria){
    if (!row.id) return;
    this.secretarias.delete(row.id).subscribe({
      next: _ => {
        this.snack.open('Removido','OK',{duration:2000});
        this.load();
      },
      error: (err: any) => {
        const msg = err?.error?.message || 'Erro ao remover';
        this.snack.open(msg, 'OK', { duration: 4000 });
      }
    });
  }
  export(){ exportToCsv('secretarias.csv', this.data.data); }
}