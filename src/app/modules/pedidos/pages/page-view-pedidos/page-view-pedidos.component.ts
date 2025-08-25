import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomDateAdapter } from '../../../../core/configGlobal/custom-date-adapter';
import { CUSTOM_DATE_FORMATS } from '../../../../core/configGlobal/custom-date-formats';
import { PedidosmntService } from '../../services/pedidosmnt.service';
import {
  IGetPedidosAsignarResponse,
  IGetPedidosResponse,
} from '../../interfaces/IPedidoTrack';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '../../../../core/components/loading/loading.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetalleFacturaComponent } from './components/dialog-detalle-factura/dialog-detalle-factura.component';

@Component({
  selector: 'app-page-view-pedidos',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    LoadingComponent,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  templateUrl: './page-view-pedidos.component.html',
  styleUrl: './page-view-pedidos.component.css',
})
export class PageViewPedidosComponent implements OnDestroy {
  pedidoService = inject(PedidosmntService);
  dialog = inject(MatDialog);
  fechaHoy: Date = new Date();
  dataSource = new MatTableDataSource<IGetPedidosResponse>([]);
  loading = false;
  loadingDetalle = false;
  pedidosSubscription!: Subscription;
  detalleSubscription!: Subscription;
  displayedColumns: string[] = [
    'actions',
    'nropedido',
    'cliente',
    'direntrega',
  ];

  ngOnDestroy(): void {
    if (this.pedidosSubscription) {
      this.pedidosSubscription.unsubscribe();
    }
    if (this.detalleSubscription) {
      this.detalleSubscription.unsubscribe();
    }
  }
  verDetalle(element: IGetPedidosResponse) {
    console.log('Ver detalle del pedido:', element);

    this.loadingDetalle = true;
    this.detalleSubscription = this.pedidoService
      .listarFacturaDetallePorPedido(element.numero)
      .subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Detalle de la factura:', response.data);

            this.loadingDetalle = false;
            this.dialog.open(DialogDetalleFacturaComponent, {
              data: { dataDetalle: response.data },
              // width: '400px',
            });
          } else {
            console.error(
              'Error al cargar el detalle de la factura:',
              response.message
            );
            this.loadingDetalle = false;
          }
        },
        error: (error) => {
          console.error('Error al cargar el detalle de la factura:', error);
          this.loadingDetalle = false;
        },
      });
  }

  cargarPedidos() {
    // Restar la diferencia horaria UTC con Perú (-5 horas)
    const fechaPeru = new Date(this.fechaHoy.getTime() - 5 * 60 * 60 * 1000);
    let fecha = fechaPeru.toISOString().split('T')[0]; // Formatear la fecha a YYYY-MM-DD

    this.loading = true;
    this.pedidosSubscription = this.pedidoService
      .listarPedidos(fecha)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.dataSource = new MatTableDataSource(response.data);
          } else {
            console.error('Error al cargar los pedidos:', response.message);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar los pedidos:', error);
          this.loading = false;
        },
      });
  }
}
