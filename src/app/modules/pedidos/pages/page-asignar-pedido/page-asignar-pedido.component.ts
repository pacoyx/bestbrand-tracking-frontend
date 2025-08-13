import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoadingComponent } from '../../../../core/components/loading/loading.component';
import { PedidosmntService } from '../../services/pedidosmnt.service';
import {
  IDataTransporteAsignarRequest,
  IGetPedidosResponse,
  IPedidoAsigandoV2Rquest,
  IPedidoAsignarRequest,
  IPedidosAsignadosRequest,
} from '../../interfaces/IPedidoTrack';
import { IGetEmpresasTransporteToHelpResponse } from '../../interfaces/IEmpresaTransporte';
import { IGetConductoresToHelpResponse } from '../../../administracion/interfaces/IUser';
import { IGetVehiculosToHelpResponse } from '../../interfaces/IVehiculo';
import { Subscription } from 'rxjs';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { CustomDateAdapter } from '../../../../core/configGlobal/custom-date-adapter';
import { CUSTOM_DATE_FORMATS } from '../../../../core/configGlobal/custom-date-formats';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { JsonPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-page-asignar-pedido',
  standalone: true,
  imports: [
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LoadingComponent,
    MatCheckboxModule,
    MatStepperModule,
    JsonPipe,
    MatSelectModule,
    CdkDropList,
    CdkDrag,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  templateUrl: './page-asignar-pedido.component.html',
  styleUrl: './page-asignar-pedido.component.css',
})
export class PageAsignarPedidoComponent implements OnInit, OnDestroy {
  pedidoService = inject(PedidosmntService);
  fechaHoy: Date = new Date();
  dataSource = new MatTableDataSource<IGetPedidosResponse>([]);
  loading = false;
  saving = false;
  empresas: IGetEmpresasTransporteToHelpResponse[] = [];
  conductores: IGetConductoresToHelpResponse[] = [];
  vehiculos: IGetVehiculosToHelpResponse[] = [];
  pedidosSubscription!: Subscription;
  displayedColumns: string[] = [
    'select',
    'prioridad',
    'nropedido',
    'cliente',
    'direntrega',
  ];

  selection = new SelectionModel<IGetPedidosResponse>(true, []);
  isLinear = false;
  asignarForm: FormGroup;
  itemsPedidos: IGetPedidosResponse[] = [];

  constructor(private fb: FormBuilder) {
    this.asignarForm = this.fb.group({
      empresa: ['', Validators.required],
      conductor: ['', Validators.required],
      vehiculo: ['', Validators.required],
      comentarios: [''],
    });
  }

  empresaSeleccionada = '';
  conductorSeleccionado = '';
  vehiculoSeleccionado = '';
  comentariosSeleccionado = '';

  ngOnInit(): void {
    this.cargarCombos();
  }

  ngOnDestroy(): void {
    if (this.pedidosSubscription) {
      this.pedidosSubscription.unsubscribe();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IGetPedidosResponse): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      0 + 1
    }`;
  }

  cargarCombos() {
    this.pedidoService.listarConductoresToHelp().subscribe({
      next: (response) => {
        if (response.success) {
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
          this.vehiculos = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar los vehículos:', error);
      },
    });

    this.pedidoService.getEmpresasTransporteToHelp().subscribe({
      next: (response) => {
        if (response.success) {
          this.empresas = response.data;
        }
      },
      error: (error) => {
        console.error('Error al cargar las empresas de transporte:', error);
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

  nextStepForm() {
    if (this.asignarForm.valid) {
      this.empresaSeleccionada =
        this.empresas.find(
          (item) => item.id === this.asignarForm.get('empresa')?.value
        )?.razonSocial || '';
      this.conductorSeleccionado =
        this.conductores.find(
          (item) => item.id === this.asignarForm.get('conductor')?.value
        )?.nombre || '';
      this.vehiculoSeleccionado =
        this.vehiculos.find(
          (item) => item.id === this.asignarForm.get('vehiculo')?.value
        )?.placa || '';
      this.comentariosSeleccionado = this.asignarForm.get('comentarios')?.value;
    }
  }

  nextStepOrder() {
    this.itemsPedidos = this.selection.selected;
  }

  drop(event: CdkDragDrop<IGetPedidosResponse[]>) {
    moveItemInArray(this.itemsPedidos, event.previousIndex, event.currentIndex);
  }

  RegistrarAsignarPedido() {
    let arrPedidosAsignados: IPedidosAsignadosRequest[] = [];

    this.itemsPedidos.forEach((pedido, index) => {
      arrPedidosAsignados.push({
        pedidoId: pedido.id,
        prioridad: index + 1,
      });
    });

    let reqDatosTransporte: IDataTransporteAsignarRequest = {
      transConductor: this.conductorSeleccionado,
      transEmpresa: this.empresaSeleccionada,
      transVehiculo: this.vehiculoSeleccionado,
      conductorId: this.asignarForm.get('conductor')?.value,
      vehiculoId: this.asignarForm.get('vehiculo')?.value,
      empresaTransporteId: this.asignarForm.get('empresa')?.value,
      comentarios: this.asignarForm.get('comentarios')?.value,
    };

    let req: IPedidoAsigandoV2Rquest = {
      DataPedidosAsignados: arrPedidosAsignados,
      DataTransporte: reqDatosTransporte,
    };

    this.saving = true;
    this.pedidoService.asignarPedidoMasivo(req).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Pedidos asignados exitosamente:', response.data);
          this.saving = false;
        } else {
          console.error('Error al asignar pedidos:', response.message);
          this.saving = false;
        }
      },
      error: (error) => {
        console.error('Error al asignar pedidos:', error);
        this.saving = false;
      },
    });
  }
}
