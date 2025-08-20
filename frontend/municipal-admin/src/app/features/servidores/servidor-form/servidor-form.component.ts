import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Servidor } from '../../../core/models/servidor.model';
import { Secretaria } from '../../../core/models/secretaria.model';
import { ServidorService } from '../../../core/services/servidor.service';
import { SecretariaService } from '../../../core/services/secretaria.service';
import { ageRangeValidator } from './age.validator';

@Component({
  selector: 'app-servidor-form',
  template: `
    <mat-card>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="grid">
    <mat-form-field appearance="outline">
    <mat-label>Nome</mat-label>
    <input matInput formControlName="nome" required>
    <mat-error *ngIf="form.get('nome')?.hasError('required')">Obrigatório</mat-error>
    </mat-form-field>

    <mat-form-field appearance="outline">
    <mat-label>E-mail</mat-label>
    <input matInput type="email" formControlName="email" required>
    <mat-error *ngIf="form.get('email')?.hasError('required')">Obrigatório</mat-error>
    <mat-error *ngIf="form.get('email')?.hasError('email')">E-mail inválido</mat-error>
    </mat-form-field>

    <mat-form-field appearance="outline">
    <mat-label>Data de Nascimento</mat-label>
    <input matInput [matDatepicker]="picker" formControlName="dataNascimentoDate" required>
    <mat-datepicker #picker></mat-datepicker>
    <mat-error *ngIf="form.get('dataNascimentoDate')?.hasError('ageOutOfRange')">Idade deve ser entre 18 e 75</mat-error>
    </mat-form-field>

    <mat-form-field appearance="outline">
    <mat-label>Secretaria</mat-label>
    <mat-select formControlName="secretariaId" required>
    <mat-option *ngFor="let s of secretarias" [value]="s.id">{{s.nome}} ({{s.sigla}})</mat-option>
    </mat-select>
    <mat-error *ngIf="form.get('secretariaId')?.hasError('required')">Obrigatório</mat-error>
    </mat-form-field>

    <div class="actions">
    <button mat-raised-button color="primary" [disabled]="form.invalid">{{editing ? 'Salvar' : 'Cadastrar'}}</button>
    <button type="button" mat-button (click)="reset()">Limpar</button>
    </div>
    </form>
    </mat-card>
  `,
  styles: [`.grid{display:grid;gap:12px;grid-template-columns:repeat(4,1fr)}@media(max-width:900px){.grid{grid-template-columns:1fr}}.actions{display:flex;gap:8px}`]
})
export class ServidorFormComponent implements OnChanges {
  
  @Input() editing?: Servidor | null;
  @Output() completed = new EventEmitter<void>();

  secretarias: Secretaria[] = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servidores: ServidorService,
    private secretariasSvc: SecretariaService,
    private snack: MatSnackBar
  ) {
    this.loadSecretarias();
    this.form = this.fb.group({
      id: [null as number | null], 
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataNascimentoDate: [null as Date | null, [ageRangeValidator(18,75)]],
      secretariaId: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editing']) {
      const e = this.editing;
      this.form.reset({
        id: e?.id ?? null,
        nome: e?.nome ?? '',
        email: e?.email ?? '',
        dataNascimentoDate: e?.dataNascimento ? new Date(e.dataNascimento) : null,
        secretariaId: e?.secretariaId ?? null,
      });
    }
  }

  loadSecretarias(){ this.secretariasSvc.list().subscribe(r => this.secretarias = r); }

  onSubmit(){
    const v = this.form.value;
    const payload: Servidor = {
      id: v.id ?? undefined,
      nome: v.nome!,
      email: v.email!,
      dataNascimento: (v.dataNascimentoDate as Date).toISOString().substring(0,10),
      secretariaId: v.secretariaId!
    };

    const req = payload.id ? this.servidores.update(payload) : this.servidores.create(payload);
    req.subscribe({
      next: _ => { this.snack.open('Servidor salvo', 'OK', { duration: 2500 }); this.completed.emit(); this.reset(); },
      error: _ => {}
    });
  }

  reset(){ this.form.reset({ id:null, nome:'', email:'', dataNascimentoDate:null, secretariaId:null }); }
}