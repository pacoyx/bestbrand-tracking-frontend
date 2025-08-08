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
import { PedidosmntService } from '../../services/pedidosmnt.service';
import { MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { DialogFormAsignarPedidoComponent } from './components/dialog-form-asignar-pedido/dialog-form-asignar-pedido.component';
import {
  IGetPedidosResponse,
  IPedidoTrack,
} from '../../interfaces/IPedidoTrack';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AdminModService } from '../../../administracion/services/admin-mod.service';
import { IGetConductoresToHelpResponse } from '../../../administracion/interfaces/IUser';
import { IGetVehiculosToHelpResponse } from '../../interfaces/IVehiculo';
import { IGetEmpresasTransporteToHelpResponse } from '../../interfaces/IEmpresaTransporte';
import { LoadingComponent } from '../../../../core/components/loading/loading.component';
import { DialogVisorPdfComponent } from '../../../../core/components/dialog-visor-pdf/dialog-visor-pdf.component';

@Component({
  selector: 'app-page-track-pedidos',
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
    LoadingComponent,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  templateUrl: './page-track-pedidos.component.html',
  styleUrl: './page-track-pedidos.component.css',
})
export class PageTrackPedidosComponent implements OnInit, OnDestroy {
  pedidoService = inject(PedidosmntService);
  adminOfService = inject(AdminModService);

  pedidosSubscription!: Subscription;
  dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'actions',
    'factura',
    'prioridad',
    'nropedido',
    'cliente',
    'direntrega',
    // 'ubigeo',
    // 'docguia',
    'transportista',
    'estadopedido',
  ];
  fechaHoy: Date = new Date();
  dataSource = new MatTableDataSource<IGetPedidosResponse>([]);
  loading = false;

  empresas: IGetEmpresasTransporteToHelpResponse[] = [];
  conductores: IGetConductoresToHelpResponse[] = [];
  vehiculos: IGetVehiculosToHelpResponse[] = [];

  ngOnInit(): void {
    this.cargarCombos();
  }

  cargarCombos() {
    this.pedidoService.listarConductoresToHelp().subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Conductores para ayudar:', response.data);
          this.conductores = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar los conductores:', error);
      },
    });

    this.pedidoService.getVehiculosToHelp().subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Vehículos para ayudar:', response.data);
          this.vehiculos = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar los vehículos:', error);
      },
    });

    this.adminOfService.getEmpresasTransporteToHelp().subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Empresas de transporte para ayudar:', response.data);
          this.empresas = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar las empresas de transporte:', error);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.pedidosSubscription) {
      this.pedidosSubscription.unsubscribe();
    }
  }

  cargarPedidos() {
    // Restar la diferencia horaria UTC con Perú (-5 horas)
    const fechaPeru = new Date(this.fechaHoy.getTime() - 5 * 60 * 60 * 1000);
    let fecha = fechaPeru.toISOString().split('T')[0]; // Formatear la fecha a YYYY-MM-DD
    console.log('Fecha seleccionada:', fecha);

    this.loading = true;
    this.pedidosSubscription = this.pedidoService
      .listarPedidos(fecha)
      .subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Pedidos cargados:', response.data);

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

  asignarConductor(pedido: IPedidoTrack) {
    const dialogRef = this.dialog.open(DialogFormAsignarPedidoComponent, {
      data: {
        objPedido: pedido,
        objEmpresas: this.empresas,
        objConductores: this.conductores,
        objVehiculos: this.vehiculos,
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarPedidos(); // Recargar la lista de pedidos después de la asignación
      }
    });
  }

  verFactura(pedido: IPedidoTrack) {
    console.log('Ver factura para el pedido:', pedido);
    this.dialog.open(DialogVisorPdfComponent, {
      data: {
        objPedido: pedido,
      },
      width: '90vw',
      height: '90vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
  }

  verGuia(pedido: IPedidoTrack) {
    console.log('Ver guía para el pedido:', pedido);
    this.dialog.open(DialogVisorPdfComponent, {
      data: {
        objPedido: pedido,
      },
      width: '90vw',
      height: '90vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
  }

}
