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
import { IListarConductoresPaginadoResponse } from '../../interfaces/IConductor';
import { DialogFormRegConductorComponent } from './components/dialog-form-reg-conductor/dialog-form-reg-conductor.component';

@Component({
  selector: 'app-page-conductores',
  standalone: true,
  imports: [
    MatIconModule, MatTableModule, MatInputModule, MatFormFieldModule,
    MatPaginatorModule, MatSortModule, MatButtonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './page-conductores.component.html',
  styleUrl: './page-conductores.component.css'
})
export class PageConductoresComponent implements OnInit, AfterViewInit, OnDestroy {

  pedidoService = inject(PedidosmntService);
  dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'nombre',
    'docIdentidad',
    'licencia',
    'telefono',
    'email',
    'empTransNombre',
    'empTransRuc',
    'estado',
    'actions'
  ];

  dataSource = new MatTableDataSource<IListarConductoresPaginadoResponse>([]);
  totalProducts = 0;
  pageSize = 10;
  bolFiltro = false;
  filterControl = new FormControl();
  conductoresSubscription!: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {

    this.cargarConductores(1, 10, '');

    this.filterControl.valueChanges
      .pipe(
        // startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value === '') {
            return of([] as IListarConductoresPaginadoResponse[]);
          }
          return this.pedidoService.listarConductoresPaginado(1, 10, value).pipe(
            map(response => {
              this.totalProducts = response.totalCount; // Actualiza el total de productos
              return response.data ?? [];
            }),
            catchError(error => {
              console.error('Error al aplicar el filtro:', error);
              this.totalProducts = 0;
              this.paginator.length = 0;
              return of([] as IListarConductoresPaginadoResponse[]);
            })
          );
        })
      )
      .subscribe(response => {
        if (this.filterControl.value === '') {
          this.limpiaFiltro();
          return;
        }

        this.bolFiltro = true;
        this.dataSource.data = response;
        this.paginator.length = this.totalProducts; // Asegúrate de actualizar la longitud del paginador
        this.paginator.pageIndex = 0;
      });
  }

  ngOnDestroy(): void {
    // Aquí puedes limpiar los recursos o suscripciones si es necesario
    this.conductoresSubscription?.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => {
      if (this.bolFiltro) {
        this.cargarConductores(this.paginator.pageIndex + 1, this.paginator.pageSize, this.filterControl.value);
      } else {
        this.cargarConductores(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }

  limpiaFiltro() {
    this.bolFiltro = false;
    this.cargarConductores(1, 10, '');
    this.filterControl.setValue('');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarConductores(pageIndex: number, pageSize: number, textoFiltro: string) {
    this.conductoresSubscription = this.pedidoService.listarConductoresPaginado(pageIndex, pageSize, textoFiltro).subscribe(
      response => {
        this.dataSource.data = response.data ?? [];
        this.totalProducts = response.totalCount;
        this.paginator.length = this.totalProducts; // Asegúrate de actualizar la longitud del paginador
      }
    );
  }

  editConductor(product: any) {
    const dialogRef = this.dialog.open(DialogFormRegConductorComponent, {
      data: { esNuevo: false, objConductor: product },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarConductores(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }

  nuevoConductor() {
    const dialogRef = this.dialog.open(DialogFormRegConductorComponent, {
      data: { esNuevo: true, objConductor: null },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarConductores(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }


}
