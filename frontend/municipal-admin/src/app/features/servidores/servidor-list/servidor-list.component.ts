import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

import { Servidor } from '../../../core/models/servidor.model';
import { ServidorService } from '../../../core/services/servidor.service';
import { SecretariaService } from '../../../core/services/secretaria.service';
import { ServidorFormComponent } from '../servidor-form/servidor-form.component';
import { exportToCsv } from '../../../shared/utils/csv.util';

@Component({
  selector: 'app-servidor-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTableModule,
    ServidorFormComponent,
  ],
  templateUrl: './servidor-list.component.html',
  styleUrls: ['./servidor-list.component.scss']
})
export class ServidorListComponent implements OnInit {
  data = new MatTableDataSource<Servidor>([]);
  cols = ['nome','email','dataNascimento','secretaria','acoes'];
  editing: Servidor | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servidores: ServidorService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(){ this.load(); }

  load(){
    this.servidores.list().subscribe(res => {
      this.data.data = res;
      Promise.resolve().then(() => { this.data.paginator = this.paginator; this.data.sort = this.sort; });
      this.editing = null;
    });
  }
  edit(row: Servidor){ this.editing = { ...row }; }
  remove(row: Servidor){ 
    if (!row.id) return;
    this.servidores.delete(row.id).subscribe(_ => { this.snack.open('Removido','OK',{duration:2000}); this.load(); }); 
  }
  export(){
    const rows = this.data.data.map(r => ({
      nome: r.nome,
      email: r.email,
      dataNascimento: r.dataNascimento,
      secretaria: r.secretaria?.nome,
      sigla: r.secretaria?.sigla
    }));
    exportToCsv('servidores.csv', rows);
  }
}