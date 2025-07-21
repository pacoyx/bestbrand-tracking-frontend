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
import { AdminModService } from '../../services/admin-mod.service';
import { DialogFormRegUsuarioComponent } from './components/dialog-form-reg-usuario/dialog-form-reg-usuario.component';
import { IGetConductoresToHelpResponse, IGetUsersPaginadoResponse } from '../../interfaces/IUser';

@Component({
  selector: 'app-page-usuarios',
  standalone: true,
  imports: [
    MatIconModule, MatTableModule, MatInputModule, MatFormFieldModule,
    MatPaginatorModule, MatSortModule, MatButtonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './page-usuarios.component.html',
  styleUrl: './page-usuarios.component.css'
})
export class PageUsuariosComponent implements OnInit, AfterViewInit, OnDestroy {
  adminMofService = inject(AdminModService);
  dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'username',
    'role',
    'conductor',    
    'estado',
    'actions'
  ];

  dataSource = new MatTableDataSource<IGetUsersPaginadoResponse>([]);
  totalProducts = 0;
  pageSize = 10;
  bolFiltro = false;
  filterControl = new FormControl();
  conductoresSubscription!: Subscription;
  conductores: IGetConductoresToHelpResponse[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

    this.cargarUsuarios(1, 10, '');
    this.cargarConducores();

    this.filterControl.valueChanges
      .pipe(
        // startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value === '') {
            return of([] as IGetUsersPaginadoResponse[]);
          }
          return this.adminMofService.getUsersPaginado(1, 10, value).pipe(
            map(response => {
              this.totalProducts = response.totalCount; // Actualiza el total de productos
              return response.data ?? [];
            }),
            catchError(error => {
              console.error('Error al aplicar el filtro:', error);
              this.totalProducts = 0;
              this.paginator.length = 0;
              return of([] as IGetUsersPaginadoResponse[]);
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
        this.cargarUsuarios(this.paginator.pageIndex + 1, this.paginator.pageSize, this.filterControl.value);
      } else {
        this.cargarUsuarios(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }

  limpiaFiltro() {
    this.bolFiltro = false;
    this.cargarUsuarios(1, 10, '');
    this.filterControl.setValue('');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarUsuarios(pageIndex: number, pageSize: number, textoFiltro: string) {
    this.conductoresSubscription = this.adminMofService.getUsersPaginado(pageIndex, pageSize, textoFiltro).subscribe(
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

  cargarConducores() {
    this.conductoresSubscription = this.adminMofService.getConductoresToHelp().subscribe({
      next: (response) => {
        this.conductores = response.data ?? [];
      },
      error: (error) => {
        console.error('Error al cargar los conductores:', error);
      }
    });
  }


  editarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(DialogFormRegUsuarioComponent, {
      data: { esNuevo: false, objUsuario: usuario, objConductores: this.conductores },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarUsuarios(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }

  nuevoUsuario() {
    const dialogRef = this.dialog.open(DialogFormRegUsuarioComponent, {
      data: { esNuevo: true, objUsuario: null, objConductores: this.conductores },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarUsuarios(this.paginator.pageIndex + 1, this.paginator.pageSize, '');
      }
    });
  }
}
