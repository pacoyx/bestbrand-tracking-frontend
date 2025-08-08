import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IGetPedidosResponse } from '../../../../interfaces/IOperaciones';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { EstadoRegistroDetalleComponent } from '../estado-registro-detalle/estado-registro-detalle.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmarEstadoComponent } from '../dialog-confirmar-estado/dialog-confirmar-estado.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-tabla-pedidos',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    MatChipsModule,
    EstadoRegistroDetalleComponent,
    MatSnackBarModule,
  ],
  templateUrl: './card-tabla-pedidos.component.html',
  styleUrl: './card-tabla-pedidos.component.css',
})
export class CardTablaPedidosComponent {
  @Input() pedido!: IGetPedidosResponse;
  @Output() changeStateOrder = new EventEmitter<{
    estado: string;
    comentarios?: string;
  }>();
  dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  cont = 0;
  estadosPosibles = ['EN_TRANSITO', 'ENTREGADO', 'CANCELADO'];
  showDetails = false;
  showBody = false;

  actualizarEstadoPedido() {
    // Lógica para actualizar el estado del pedido
  }
  verPdfFactura() {
    // Lógica para ver el PDF de la factura del pedido
  }

  changeState(event: Event) {
    event.stopPropagation();
    console.log('Estado del pedido cambiado:', this.pedido.estadoPedido);

    if (this.pedido.estadoPedido === 'CANCELADO') {
      this._snackBar.open('No se puede cambiar el estado', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    let nuevoEstadoTmp = this.getNuevoEstado(this.pedido.estadoPedido);

    const dialogRef = this.dialog.open(DialogConfirmarEstadoComponent, {
      data: { estado: nuevoEstadoTmp },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { comentarios: string; ok: boolean }) => {
        if (result.ok) {
          this.pedido.estadoPedido = nuevoEstadoTmp;
          this.changeStateOrder.emit({
            estado: this.pedido.estadoPedido,
            comentarios: result.comentarios,
          });
        }
      });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
  toggleBody() {
    this.showBody = !this.showBody;
  }

getNuevoEstado(estadoActual: string): string {
    if (estadoActual === 'EN_TRANSITO') {
      return 'ENTREGADO';
    } else if (estadoActual === 'ENTREGADO') {
      return 'CANCELADO';
    } else if (estadoActual === 'ASIGNADO') {
      return 'EN_TRANSITO';
    } else {
      return 'EN_TRANSITO';
    }
  }

}
