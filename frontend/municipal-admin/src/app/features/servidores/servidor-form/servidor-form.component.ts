import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Servidor } from '../../../core/models/servidor.model';
import { Secretaria } from '../../../core/models/secretaria.model';
import { ServidorService } from '../../../core/services/servidor.service';
import { SecretariaService } from '../../../core/services/secretaria.service';
import { ageRangeValidator } from './age.validator';

@Component({
  selector: 'app-servidor-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './servidor-form.component.html',
  styleUrls: ['./servidor-form.component.scss']
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
    if (changes['editing'] && this.editing) {
      const e = this.editing;
      this.form.reset({
        id: e?.id ?? null,
        nome: e?.nome ?? '',
        email: e?.email ?? '',
        dataNascimentoDate: e?.dataNascimento ? new Date(e.dataNascimento) : null,
        secretariaId: e.secretaria?.id! ?? null
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
      next: _ => { this.snack.open('Servidor salvo', 'OK', { duration: 2500 }); this.completed.emit(); if (!payload.id) this.reset(); },
      error: _ => {}
    });
  }

  reset(){ this.form.reset({ id:null, nome:'', email:'', dataNascimentoDate:null, secretariaId:null }); }
  
  clean() {
    this.form.reset({ id:null, nome:'', email:'', dataNascimentoDate:'', secretariaId:'' }, { emitEvent: false }); 
  }
}