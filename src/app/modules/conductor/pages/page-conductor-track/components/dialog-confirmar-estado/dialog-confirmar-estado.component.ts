import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-dialog-confirmar-estado',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,NgClass
  ],
  templateUrl: './dialog-confirmar-estado.component.html',
  styleUrl: './dialog-confirmar-estado.component.css',
})
export class DialogConfirmarEstadoComponent {
  readonly data = inject<{ estado: string }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DialogConfirmarEstadoComponent>);
  loadingSave = false;
  titulo = 'Confirmar Estado';

  constructor() {}

  cancelar() {
    this.dialogRef.close({ ok: false });
  }

  confirmar() {
    this.loadingSave = true;
    this.dialogRef.close({ comentarios: this.txtComentarios, ok: true });
  }
  txtComentarios = '';
}
