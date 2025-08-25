import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialogClose
} from '@angular/material/dialog';
import { IGetFacturaDetallePorPedidoResponse } from '../../../../interfaces/IPedidoTrack';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-detalle-factura',
  standalone: true,
  imports: [    
    MatDialogTitle,    
    MatIconModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose
  ],
  templateUrl: './dialog-detalle-factura.component.html',
  styleUrl: './dialog-detalle-factura.component.css',
})
export class DialogDetalleFacturaComponent {
  readonly data = inject<{
    dataDetalle: IGetFacturaDetallePorPedidoResponse[];
  }>(MAT_DIALOG_DATA);
  titulo = 'Detalle de la Factura';

  constructor(private dialogRef: MatDialogRef<DialogDetalleFacturaComponent>) {}
}
