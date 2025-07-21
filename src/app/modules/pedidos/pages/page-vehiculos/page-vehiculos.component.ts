import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, of, Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PedidosmntService } from '../../services/pedidosmnt.service';
import { DialogFormRegVehiculoComponent } from './components/dialog-form-reg-vehiculo/dialog-form-reg-vehiculo.component';
import { IGetVehiculosPaginatorResponse } from '../../interfaces/IVehiculo';


@Component({
  selector: 'app-page-vehiculos',
  standalone: true,
  imports: [
    MatIconModule, MatTableModule, MatInputModule, MatFormFieldModule,
    MatPaginatorModule, MatSortModule, MatButtonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './page-vehiculos.component.html',
  styleUrl: './page-vehiculos.component.css'
})
export class PageVehiculosComponent implements OnInit, AfterViewInit, OnDestroy {
  pedidoService = inject(PedidosmntService);
  dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'placa',
    'marca',
    'modelo',
    'anio',
    'estado',
    'actions'
  ];

  dataSource = new MatTableDataSource<IGetVehiculosPaginatorResponse>([]);
  totalProducts = 0;
  pageSize = 10;
  bolFiltro = false;
  filterControl = new FormControl();
  conductoresSubscription!: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  ngOnInit(): void {

    this.cargarVehiculos(1, 10, '');

    this.filterControl.valueChanges
      .pipe(
        // startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value === '') {
            return of([] as IGetVehiculosPaginatorResponse[]);
          }
          return this.pedidoService.getVehiculosPaginator(1, 10, value).pipe(
            map(response => {
              this.totalProducts = response.totalCount; // Actualiza el total de productos
              return response.data ?? [];
            }),
             catchError(error => {
              console.error('Error al aplicar el filtro:', error);
              this.totalProducts = 0;
              this.paginator.length = 0;
              return of([] as IGetVehiculosPaginatorResponse[]);
            })
          );
        })
      )
      .subscribe({
        next: (response) => {
          if (this.filterControl.value === '') {
            this.limpiaFiltro();
            return;
          }

          this.bolFiltro = true;
          this.dataSource.data = response;
          this.paginator.length = this.totalProducts; // Asegúrate de actualizar la longitud del paginador
          this.paginator.pageIndex = 0;

        },
        error: (error) => {
          console.error('Error al aplicar el filtro:', error);
          this.bolFiltro = true;
          this.dataSource.data = []; // Limpia la tabla en caso de error
          this.totalProducts = 0;
          this.paginator.length = 0; // Actualiza la longitud del paginador          
        }
      });
  }

  ngOnDestroy(): void {
    this.conductoresSubscription?.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => {
      if (this.bolFiltro) {
        this.cargarVehiculos(this.paginator.pageIndex + 1, this.paginator.pageSize, this.filterControl.value);
      } else {
        this.cargarVehiculos(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }

  limpiaFiltro() {
    this.bolFiltro = false;
    this.cargarVehiculos(1, 10, '');
    this.filterControl.setValue('');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarVehiculos(pageIndex: number, pageSize: number, textoFiltro: string) {
    this.conductoresSubscription = this.pedidoService.getVehiculosPaginator(pageIndex, pageSize, textoFiltro).subscribe(
      {
        next: (response) => {
          this.dataSource.data = response.data ?? [];
          this.totalProducts = response.totalCount;
          this.paginator.length = this.totalProducts; // Asegúrate de actualizar la longitud del paginador
        },
        error: (error) => {
          console.error('Error al cargar los vehículos:', error);
          this.dataSource.data = []; // Limpia la tabla en caso de error
          this.totalProducts = 0;
          this.paginator.length = 0; // Actualiza la longitud del paginador
        }
      }
      // response => {
      //   this.dataSource.data = response.data ?? [];
      //   this.totalProducts = response.totalCount;
      //   this.paginator.length = this.totalProducts; // Asegúrate de actualizar la longitud del paginador
      // }
    );
  }

  editarVehiculo(product: any) {
    const dialogRef = this.dialog.open(DialogFormRegVehiculoComponent, {
      data: { esNuevo: false, objProduct: product },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarVehiculos(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }

  nuevoVehiculo() {
    const dialogRef = this.dialog.open(DialogFormRegVehiculoComponent, {
      data: { esNuevo: true, objCliente: null },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarVehiculos(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }

}
