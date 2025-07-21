import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AdminModService } from '../../services/admin-mod.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { catchError, debounceTime, distinctUntilChanged, map, of, Subscription, switchMap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IGetEmpresasTransporteResponse } from '../../../pedidos/interfaces/IEmpresaTransporte';
import { DialogFormEmpresaComponent } from './components/dialog-form-empresa/dialog-form-empresa.component';

@Component({
  selector: 'app-page-empresa',
  standalone: true,
  imports: [
    MatIconModule, MatInputModule, MatFormFieldModule,MatTableModule,
    MatPaginatorModule, MatSortModule, MatButtonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './page-empresa.component.html',
  styleUrl: './page-empresa.component.css'
})
export class PageEmpresaComponent {
  adminMofService = inject(AdminModService);
  dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'ruc',
    'razonSocial',
    'direccion',
    'telefono',
    'email',
    'estado',
    'actions'
  ];

  dataSource = new MatTableDataSource<IGetEmpresasTransporteResponse>([]);
  totalProducts = 0;
  pageSize = 10;
  bolFiltro = false;
  filterControl = new FormControl();
  empresasSubscription!: Subscription;
  empresas: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {

    this.cargarEmpresas(1, 10, '');

    this.filterControl.valueChanges
      .pipe(
        // startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value === '') {
            return of([] as IGetEmpresasTransporteResponse[]);
          }
          return this.adminMofService.getEmpresasTransportePaginado(1, 10, value).pipe(
            map(response => {
              this.totalProducts = response.totalCount; // Actualiza el total de productos
              return response.data ?? [];
            }),
            catchError(error => {
              console.error('Error al aplicar el filtro:', error);
              this.totalProducts = 0;
              this.paginator.length = 0;
              return of([] as IGetEmpresasTransporteResponse[]);
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
    this.empresasSubscription?.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => {
      if (this.bolFiltro) {
        this.cargarEmpresas(this.paginator.pageIndex + 1, this.paginator.pageSize, this.filterControl.value);
      } else {
        this.cargarEmpresas(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }

  limpiaFiltro() {
    this.bolFiltro = false;
    this.cargarEmpresas(1, 10, '');
    this.filterControl.setValue('');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpresas(pageIndex: number, pageSize: number, textoFiltro: string) {
    this.empresasSubscription = this.adminMofService.getEmpresasTransportePaginado(pageIndex, pageSize, textoFiltro).subscribe(
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
    );
  }

  editarEmpresa(product: any) {
    const dialogRef = this.dialog.open(DialogFormEmpresaComponent, {
      data: { esNuevo: false, objEmpresa: product },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarEmpresas(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }

  nuevoEmpresa() {
    const dialogRef = this.dialog.open(DialogFormEmpresaComponent, {
      data: { esNuevo: true, objEmpresa: null },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarEmpresas(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }

}
