import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Secretaria } from '../../../core/models/secretaria.model';
import { SecretariaService } from '../../../core/services/secretaria.service';
import { exportToCsv } from '../../../shared/utils/csv.util';

@Component({
  selector: 'app-secretaria-list',
  template: `
    <mat-card>
    <div class="header">
    <h2>Secretarias</h2>
    <span class="spacer"></span>
    <button mat-stroked-button (click)="export()">Exportar CSV</button>
    </div>
    <app-secretaria-form (completed)="load()" [editing]="editing"></app-secretaria-form>


    <table mat-table [dataSource]="data" class="mat-elevation-z2">
    <ng-container matColumnDef="nome">
    <th mat-header-cell *matHeaderCellDef> Nome </th>
    <td mat-cell *matCellDef="let row"> {{row.nome}} </td>
    </ng-container>
    <ng-container matColumnDef="sigla">
    <th mat-header-cell *matHeaderCellDef> Sigla </th>
    <td mat-cell *matCellDef="let row"> {{row.sigla}} </td>
    </ng-container>
    <ng-container matColumnDef="acoes">
    <th mat-header-cell *matHeaderCellDef> Ações </th>
    <td mat-cell *matCellDef="let row">
    <button mat-icon-button (click)="edit(row)"><mat-icon>edit</mat-icon></button>
    <button mat-icon-button color="warn" (click)="remove(row)"><mat-icon>delete</mat-icon></button>
    </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="cols"></tr>
    <tr mat-row *matRowDef="let row; columns: cols;"></tr>
    </table>
    </mat-card>
  `,
styles: [`.header{display:flex;align-items:center;gap:12px}.spacer{flex:1}`]
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