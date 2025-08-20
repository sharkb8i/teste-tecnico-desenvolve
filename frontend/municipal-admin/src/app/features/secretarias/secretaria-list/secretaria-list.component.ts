import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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

  constructor(private api: SecretariaService, private snack: MatSnackBar) {}
  
  ngOnInit(){ this.load(); }
  
  load(){ this.api.list().subscribe(res => { this.data.data = res; this.editing = null; }); }
  edit(row: Secretaria){ this.editing = { ...row }; }
  remove(row: Secretaria){
    if (!row.id) return;
    this.api.delete(row.id).subscribe({ next: _ => { this.snack.open('Removido','OK',{duration:2000}); this.load(); } });
  }
  export(){ exportToCsv('secretarias.csv', this.data.data); }
}