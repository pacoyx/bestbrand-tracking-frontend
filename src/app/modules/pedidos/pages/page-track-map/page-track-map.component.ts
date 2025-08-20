import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LeafletMapComponent } from '../../../../core/components/leaflet-map/leaflet-map.component';
import { PedidosmntService } from '../../services/pedidosmnt.service';
import { IGetUbicacionConductoresResponse } from '../../interfaces/IPedidoTrack';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IInfoPropMarker } from '../../../../core/interfaces/ICommons';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '../../../../core/components/loading/loading.component';


import { switchMap, tap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-page-track-map',
  standalone: true,
  imports: [
    LeafletMapComponent,
    MatCardModule,
    MatIconModule,
    LoadingComponent,
  ],
  templateUrl: './page-track-map.component.html',
  styleUrl: './page-track-map.component.css',
})
export class PageTrackMapComponent implements OnInit, OnDestroy {
  pedidoService = inject(PedidosmntService);
  ListConductores: IGetUbicacionConductoresResponse[] = [];
  usuarioId: number = 1009;
  xLatitud: number = 0;
  yLongitud: number = 0;
  loading = false;
  fechaHoy = new Date();
  xpropiedades: IInfoPropMarker = {
    unidad: '',
    nombre: '',
    direccion: '',
  };
  selectedConductorId: number | null = null;
  ubiConductoresSubscription!: Subscription;
  coorPorUsuSubscription!: Subscription;
  dirNominatiSubscription!: Subscription;

  ngOnInit(): void {
    this.cargarUbicacionConductores();
    console.log(this.fechaHoy.toISOString().split('T')[0]);
  }

  ngOnDestroy(): void {
    if (this.ubiConductoresSubscription) {
      this.ubiConductoresSubscription.unsubscribe();
    }
    if (this.coorPorUsuSubscription) {
      this.coorPorUsuSubscription.unsubscribe();
    }
    if (this.dirNominatiSubscription) {
      this.dirNominatiSubscription.unsubscribe();
    }
  }

  cargarUbicacionConductores() {
    // const fecha = this.fechaHoy.toISOString().split('T')[0];
    const fecha = '2025-08-06';
    this.ubiConductoresSubscription = this.pedidoService
      .getUbicacionConductores(fecha)
      .subscribe({
        next: (response) => {
          this.ListConductores = response.data;
        },
        error: (error) => {
          console.error('Error al cargar conductores', error);
        },
      });
  }

  handlerListConductor(conductor: IGetUbicacionConductoresResponse) {
    this.selectedConductorId = conductor.usuarioId;
    this.usuarioId = conductor.usuarioId;
    this.actualizarInfoMarker(conductor);
    this.obtenerCoordenasPorUsuario(this.usuarioId);
  }

  isConductorSelected(conductor: any): boolean {
    return this.selectedConductorId === conductor.usuarioId;
  }

  private actualizarInfoMarker(conductor: IGetUbicacionConductoresResponse) {
    this.xpropiedades = {
      unidad: conductor.placaVehiculo,
      nombre: conductor.nombreConductor,
      direccion: '',
    };
  }

  // obtenerCoordenasPorUsuario(usuarioId: number) {
  //   this.loading = true;
  //   this.coorPorUsuSubscription = this.pedidoService
  //     .getCoordenasPorUsuario(usuarioId)
  //     .subscribe({
  //       next: (response) => {
  //         this.xLatitud = response.data.latitud;
  //         this.yLongitud = response.data.longitud;

  //         this.dirNominatiSubscription = this.pedidoService
  //           .getDireccionNominatim(this.xLatitud, this.yLongitud)
  //           .subscribe({
  //             next: (direccionResponse) => {
  //               this.xpropiedades.direccion = direccionResponse.display_name;
  //               this.loading = false;
  //             },
  //             error: (error) => {
  //               console.error('Error al obtener dirección', error);
  //             },
  //           });
  //       },
  //       error: (error) => {
  //         this.loading = false;
  //       },
  //     });
  // }

  obtenerCoordenasPorUsuario(usuarioId: number) {
  this.loading = true;
  
  this.coorPorUsuSubscription = this.pedidoService
    .getCoordenasPorUsuario(usuarioId)
    .pipe(
      // Validar respuesta de coordenadas
      tap((response) => {
        if (!response?.data?.latitud || !response?.data?.longitud) {
          throw new Error('Coordenadas inválidas recibidas');
        }
      }),
      // Actualizar coordenadas y obtener dirección
      switchMap((response) => {
        this.xLatitud = response.data.latitud;
        this.yLongitud = response.data.longitud;
        
        return this.pedidoService.getDireccionNominatim(
          this.xLatitud, 
          this.yLongitud
        );
      }),
      // Manejo de errores específico
      catchError((error) => {
        console.error('Error en obtenerCoordenasPorUsuario:', error);
        
        // Retornar dirección por defecto en caso de error
        return of({ 
          display_name: 'Dirección no disponible' 
        });
      }),
      // Limpiar loading state
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next: (direccionResponse) => {
        this.xpropiedades.direccion = direccionResponse.display_name || 'Dirección no disponible';
        
        console.log('Ubicación cargada exitosamente:', {
          usuarioId,
          coordenadas: { lat: this.xLatitud, lng: this.yLongitud },
          direccion: this.xpropiedades.direccion
        });
      },
      error: (error) => {
        // Este bloque solo se ejecutaría si hay errores no manejados
        console.error('Error no manejado:', error);
      }
    });
}

  getTiempoTranscurrido(fecha: Date | string): string {
    const fechaInput = typeof fecha === 'string' ? new Date(fecha) : fecha;
    const fechaActual = new Date();
    const diferenciaMilisegundos = fechaActual.getTime() - fechaInput.getTime();

    const segundos = Math.floor(diferenciaMilisegundos / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      return `${dias} día${dias > 1 ? 's' : ''}`;
    } else if (horas > 0) {
      return `${horas} hora${horas > 1 ? 's' : ''}`;
    } else if (minutos > 0) {
      return `${minutos} minuto${minutos > 1 ? 's' : ''}`;
    } else {
      return `${segundos} segundo${segundos > 1 ? 's' : ''}`;
    }
  }
}
