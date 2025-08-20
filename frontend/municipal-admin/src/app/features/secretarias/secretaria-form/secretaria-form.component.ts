import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    ReactiveFormsModule,
  ],
  templateUrl: './secretaria-form.component.html',
  styleUrls: ['./secretaria-form.component.scss']
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