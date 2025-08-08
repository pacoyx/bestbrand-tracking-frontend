import { Component, inject } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { UtilsService } from '../../services/utils.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IGetPedidosResponse } from '../../../modules/pedidos/interfaces/IPedidoTrack';
@Component({
  selector: 'app-dialog-visor-pdf',
  standalone: true,
  imports: [
    NgxExtendedPdfViewerModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
  ],
  templateUrl: './dialog-visor-pdf.component.html',
  styleUrl: './dialog-visor-pdf.component.css',
})
export class DialogVisorPdfComponent {
  readonly data = inject<{ objPedido: IGetPedidosResponse }>(MAT_DIALOG_DATA);
  utilsService = inject(UtilsService);

  public src!: Blob;
  title='Factura N° 0000000';


  constructor() {
    this.openPdf(this.data.objPedido.numero); // Replace '12345' with the actual pedidoId you want to test
  }

  openPdf(numeroPedido: string): void {
    this.utilsService.getPdfByPedido(numeroPedido).subscribe((pdfBlob) => {
      this.src = pdfBlob;
      const pdfUrl = URL.createObjectURL(pdfBlob);
      console.log(`Opening PDF: ${pdfUrl}`);
    });
  }
}
