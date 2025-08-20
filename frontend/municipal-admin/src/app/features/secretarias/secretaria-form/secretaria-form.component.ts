import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Secretaria } from '../../../core/models/secretaria.model';
import { SecretariaService } from '../../../core/services/secretaria.service';

@Component({
  selector: 'app-secretaria-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './secretaria-form.component.html',
  styleUrls: ['./secretaria-form.component.scss']
})
export class SecretariaFormComponent implements OnChanges {
  @Input() editing?: Secretaria | null;
  @Output() completed = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private secretarias: SecretariaService, private snack: MatSnackBar) {
    this.form = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      sigla: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editing'] && this.editing) {
      const e = this.editing;
      this.form.reset({
        id: e?.id ?? null,
        nome: e?.nome ?? '',
        sigla: e?.sigla ?? '',
      });
    }
  }

  onSubmit() {
    const v = this.form.value;
    const payload: Secretaria = {
      id: v.id ?? undefined,
      nome: v.nome!,
      sigla: v.sigla!,
    };

    const req = payload.id ? this.secretarias.update(payload) : this.secretarias.create(payload);
    req.subscribe({
      next: _ => { this.snack.open('Secretaria salva', 'OK', { duration: 2500 }); this.completed.emit(); if (!payload.id) this.reset(); },
      error: _ => {}
    });
  }

  reset(){ this.form.reset({ id: null, nome: '', sigla: '' }); }
  
  clean() {
    this.form.reset({ id: null, nome: '', sigla: '' }, { emitEvent: false }); 
  }
}