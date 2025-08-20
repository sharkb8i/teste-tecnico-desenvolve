import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Servidor } from '../../../core/models/servidor.model';
import { ServidorService } from '../../../core/services/servidor.service';
import { SecretariaService } from '../../../core/services/secretaria.service';
import { exportToCsv } from '../../../shared/utils/csv.util';

@Component({
  selector: 'app-servidor-list',
  template: `
    <mat-card>
    <div class="header">
    <h2>Servidores</h2>
    <span class="spacer"></span>
    <button mat-stroked-button (click)="export()">Exportar CSV</button>
    </div>

    <app-servidor-form (completed)="load()" [editing]="editing"></app-servidor-form>

    <table mat-table [dataSource]="data" matSort class="mat-elevation-z2">
    <ng-container matColumnDef="nome">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Nome </th>
    <td mat-cell *matCellDef="let r"> {{r.nome}} </td>
    </ng-container>
    <ng-container matColumnDef="email">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Email </th>
    <td mat-cell *matCellDef="let r"> {{r.email}} </td>
    </ng-container>
    <ng-container matColumnDef="dataNascimento">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Nascimento </th>
    <td mat-cell *matCellDef="let r"> {{r.dataNascimento | date:'dd/MM/yyyy'}} </td>
    </ng-container>
    <ng-container matColumnDef="secretaria">
    <th mat-header-cell *matHeaderCellDef> Secretaria </th>
    <td mat-cell *matCellDef="let r"> {{r.secretaria?.nome}} ({{r.secretaria?.sigla}}) </td>
    </ng-container>
    <ng-container matColumnDef="acoes">
    <th mat-header-cell *matHeaderCellDef> Ações </th>
    <td mat-cell *matCellDef="let r">
    <button mat-icon-button (click)="edit(r)"><mat-icon>edit</mat-icon></button>
    <button mat-icon-button color="warn" (click)="remove(r)"><mat-icon>delete</mat-icon></button>
    </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="cols"></tr>
    <tr mat-row *matRowDef="let row; columns: cols;"></tr>
    </table>
    <mat-paginator [length]="data.data.length" [pageSize]="5" [pageSizeOptions]="[5,10,20]"></mat-paginator>
    </mat-card>
  `,
  styles: [`.header{display:flex;align-items:center;gap:12px}.spacer{flex:1}`]
})
export class ServidorListComponent implements OnInit {
  data = new MatTableDataSource<Servidor>([]);
  cols = ['nome','email','dataNascimento','secretaria','acoes'];
  editing: Servidor | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servidores: ServidorService,
    private secretarias: SecretariaService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(){ this.load(); }

  load(){
    this.servidores.list().subscribe(res => {
      // Caso o backend não expanda secretaria, poderíamos montar via map usando secretarias.list()
      this.data.data = res;
      Promise.resolve().then(() => { this.data.paginator = this.paginator; this.data.sort = this.sort; });
      this.editing = null;
    });
  }
  edit(row: Servidor){ this.editing = { ...row }; }
  remove(row: Servidor){ if(row.id) this.servidores.delete(row.id).subscribe(_ => { this.snack.open('Removido','OK',{duration:2000}); this.load(); }); }
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