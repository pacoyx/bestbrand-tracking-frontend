import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { CustomDateAdapter } from '../../../../core/configGlobal/custom-date-adapter';
import { CUSTOM_DATE_FORMATS } from '../../../../core/configGlobal/custom-date-formats';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {
  IActualizarEstadoPedidoRequest,
  IGetPedidosResponse,
} from '../../interfaces/IOperaciones';
import { DialogFormActualizarEstadoPedidoComponent } from './components/dialog-form-actualizar-estado-pedido/dialog-form-actualizar-estado-pedido.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ConductorTrackService } from '../../services/conductor-track.service';
import { DeviceDetectionService } from '../../../../core/services/device-detection.service';
import { CardTablaPedidosComponent } from './components/card-tabla-pedidos/card-tabla-pedidos.component';
import { LoadingComponent } from '../../../../core/components/loading/loading.component';

@Component({
  selector: 'app-page-conductor-track',
  standalone: true,
  imports: [
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    CardTablaPedidosComponent,
    LoadingComponent,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  templateUrl: './page-conductor-track.component.html',
  styleUrl: './page-conductor-track.component.css',
})
export class PageConductorTrackComponent implements OnInit, OnDestroy {
  private deviceService = inject(DeviceDetectionService);
  isMobile$ = this.deviceService.isMobile$;
  dialog = inject(MatDialog);
  conductorService = inject(ConductorTrackService);
  loginService = inject(AuthService);
  pedidosSubscription!: Subscription;
  displayedColumns: string[] = [
    'actions',
    'factura',
    'prioridad',
    'cliente',
    'direntrega',
    'docguia',
    'transportista',
    'estadopedido',
  ];
  fechaHoy: Date = new Date();
  dataSource = new MatTableDataSource<IGetPedidosResponse>([]);
  loading = false;
  loadingSave = false;
  idMobile: boolean = false;
  driverId: number = 0; // ID del conductor, se puede obtener de la sesión o contexto actual
  dataPedidos: IGetPedidosResponse[] = [];

  ngOnInit(): void {
    // Obtener el ID del conductor desde el servicio de autenticación
    const user = this.loginService.getCurrentUser();
    if (user && user.driverId) {
      this.driverId = user.driverId;
    }
    this.isMobile$.subscribe((isMobile) => {
      console.log('Es móvil:', isMobile);
      this.idMobile = isMobile;
    });
  }

  cargarPedidos() {
    // Restar la diferencia horaria UTC con Perú (-5 horas)
    const fechaPeru = new Date(this.fechaHoy.getTime() - 5 * 60 * 60 * 1000);
    let fecha = fechaPeru.toISOString().split('T')[0]; // Formatear la fecha a YYYY-MM-DD
    

    this.loading = true;
    this.pedidosSubscription = this.conductorService
      .listarPedidos(fecha, this.driverId)
      .subscribe({
        next: (response) => {
          if (response.success) {    
            this.dataPedidos = response.data;
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

  verPdfFactura(pedido: IGetPedidosResponse) {   

    this.conductorService.obtenerFacturaPdfPorPedido(pedido.numero).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `factura_${pedido.numero}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error al obtener el PDF de la factura:', error);
      },
    });
  }

  cambiarEstadoPedido(
    nuevoEstado: { estado: string; comentarios?: string },
    pedidoId: number
  ) {    
    const fechaPeru = new Date(new Date().getTime() - 5 * 60 * 60 * 1000);
    let fechaEntrega = fechaPeru.toISOString().split('T')[0]; // Formatear la fecha a YYYY-MM-DD

    this.loadingSave = true;
    const data: IActualizarEstadoPedidoRequest = {
      pedidoId: pedidoId,
      estadoPedido: nuevoEstado.estado,
      comentarios: nuevoEstado.comentarios || '',
      fechaEntrega:
        nuevoEstado.estado === 'ENTREGADO' ? fechaEntrega : '0001-01-01',
      nombreFoto: '',
      conductorId: this.driverId, // Asignar el ID del conductor
    };
    console.log('Datos para actualizar el estado del pedido:', data);

    this.conductorService
      .actualizarEstadoPedido(data.pedidoId, data)
      .subscribe({
        next: (response) => {
          this.loadingSave = false;
          if (response.data) {
          } else {
            console.error('Error updating order status:', response.message);
          }
        },
        error: (error) => {
          this.loadingSave = false;
          console.error('Error:', error);
        },
      });
  }

  actualizarEstadoPedido(pedido: IGetPedidosResponse) {
    const dialogRef = this.dialog.open(
      DialogFormActualizarEstadoPedidoComponent,
      {
        data: { pedido },
        width: '500px',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarPedidos(); // Recargar la lista de pedidos después de la asignación
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pedidosSubscription) {
      this.pedidosSubscription.unsubscribe();
    }
  }
}
