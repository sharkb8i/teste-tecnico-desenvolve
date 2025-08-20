import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Secretaria } from '../../../core/models/secretaria.model';
import { SecretariaService } from '../../../core/services/secretaria.service';

@Component({
  selector: 'app-secretaria-form',
  template: `
    <mat-card>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="grid">
    <mat-form-field appearance="outline">
    <mat-label>Nome</mat-label>
    <input matInput formControlName="nome" required>
    <mat-error *ngIf="form.get('nome')?.hasError('required')">Obrigatório</mat-error>
    </mat-form-field>


    <mat-form-field appearance="outline">
    <mat-label>Sigla</mat-label>
    <input matInput formControlName="sigla" required>
    <mat-error *ngIf="form.get('sigla')?.hasError('required')">Obrigatório</mat-error>
    </mat-form-field>


    <div class="actions">
    <button mat-raised-button color="primary" [disabled]="form.invalid">{{editing ? 'Salvar' : 'Cadastrar'}}</button>
    <button type="button" mat-button (click)="reset()">Limpar</button>
    </div>
    </form>
    </mat-card>
  `,
  styles: [`.grid{display:grid;gap:12px;grid-template-columns:1fr 200px}.actions{display:flex;gap:8px}`]
})
export class SecretariaFormComponent implements OnChanges {
  @Input() editing?: Secretaria | null;
  @Output() completed = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private api: SecretariaService, private snack: MatSnackBar) {
    this.form = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      sigla: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editing']) {
      this.form.reset(this.editing ?? { id: null, nome: '', sigla: '' });
    }
  }

  onSubmit() {
    const value = this.form.value as Secretaria;
    const req = value.id ? this.api.update(value) : this.api.create(value);
    req.subscribe({
      next: _ => { this.snack.open('Secretaria salva', 'OK', { duration: 2500 }); this.completed.emit(); this.reset(); },
      error: _ => {}
    });
  }

  reset(){ this.form.reset({ id: null, nome: '', sigla: '' }); }
}