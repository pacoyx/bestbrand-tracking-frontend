import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
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
import { IGetPedidosResponse } from '../../interfaces/IOperaciones';
import { PedidosmntService } from '../../../pedidos/services/pedidosmnt.service';


@Component({
  selector: 'app-page-conductor-track',
  standalone: true,
  imports: [
    MatIconModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule,
    MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatChipsModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  templateUrl: './page-conductor-track.component.html',
  styleUrl: './page-conductor-track.component.css'
})
export class PageConductorTrackComponent implements OnInit, OnDestroy {
  pedidoService = inject(PedidosmntService);
  pedidosSubscription!: Subscription;
  dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'actions',
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

  ngOnInit(): void {

  }


  cargarPedidos() {

    // Restar la diferencia horaria UTC con Perú (-5 horas)
    const fechaPeru = new Date(this.fechaHoy.getTime() - (5 * 60 * 60 * 1000));
    let fecha = fechaPeru.toISOString().split('T')[0]; // Formatear la fecha a YYYY-MM-DD
    console.log('Fecha seleccionada:', fecha);

    this.loading = true;
    this.pedidosSubscription = this.pedidoService.listarPedidos(fecha).subscribe({
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
      }
    });
  }

  actualizarEstadoPedido(pedido: IGetPedidosResponse) {
    this.loading = true;
  }



  ngOnDestroy(): void {
    if (this.pedidosSubscription) {
      this.pedidosSubscription.unsubscribe();
    }
  }


}
