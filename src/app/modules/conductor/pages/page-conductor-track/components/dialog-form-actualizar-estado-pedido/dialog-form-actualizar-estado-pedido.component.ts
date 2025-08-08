import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ConductorTrackService } from '../../../../services/conductor-track.service';
import {
  IActualizarEstadoPedidoRequest,
  IGetPedidosResponse,
} from '../../../../interfaces/IOperaciones';

@Component({
  selector: 'app-dialog-form-actualizar-estado-pedido',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './dialog-form-actualizar-estado-pedido.component.html',
  styleUrl: './dialog-form-actualizar-estado-pedido.component.css',
})
export class DialogFormActualizarEstadoPedidoComponent implements OnInit {
  readonly data = inject<{ pedido: IGetPedidosResponse }>(MAT_DIALOG_DATA);
  conductorService = inject(ConductorTrackService);
  loadingSave = false;
  asignarForm: FormGroup;
  titulo = 'Actualizar Pedido';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormActualizarEstadoPedidoComponent>
  ) {
    this.asignarForm = this.fb.group({
      id: 0,
      estado: ['', Validators.required],
      comentarios: '',
    });
  }

  ngOnInit(): void {
    console.log('Datos del pedido:', this.data);
    if (this.data) {
      this.asignarForm.patchValue({
        id: this.data.pedido.id,
        estado: this.data.pedido.estadoPedido,
      });
    }
  }

  grabar() {
    if (this.asignarForm.invalid) {
      return;
    }

    const fechaPeru = new Date(new Date().getTime() - 5 * 60 * 60 * 1000);
    let fechaEntrega = fechaPeru.toISOString().split('T')[0]; // Formatear la fecha a YYYY-MM-DD

    this.loadingSave = true;
    const data: IActualizarEstadoPedidoRequest = {
      pedidoId: this.asignarForm.value.id,
      estadoPedido: this.asignarForm.value.estado,
      comentarios: this.asignarForm.value.comentarios,
      fechaEntrega: fechaEntrega,
      nombreFoto: '', 
      conductorId: this.data.pedido.conductorId || 0, // Asignar el ID del conductor si está disponible
    };
    console.log('Datos a enviar:', data);

    this.conductorService
      .actualizarEstadoPedido(data.pedidoId, data)
      .subscribe({
        next: (response) => {
          this.loadingSave = false;
          if (response.data) {
            this.dialogRef.close(true);
          } else {
            // Handle error case
            console.error('Error updating order status:', response.message);
          }
        },
        error: (error) => {
          this.loadingSave = false;
          console.error('Error:', error);
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
