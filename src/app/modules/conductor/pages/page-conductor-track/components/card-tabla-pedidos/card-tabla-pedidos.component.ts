import {
  Component,
  EventEmitter,  
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  IGetPedidosResponse,
  IPedidoImagenBase64DtoRequest,
} from '../../../../interfaces/IOperaciones';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { EstadoRegistroDetalleComponent } from '../estado-registro-detalle/estado-registro-detalle.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmarEstadoComponent } from '../dialog-confirmar-estado/dialog-confirmar-estado.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogWebcamComponent } from '../dialog-webcam/dialog-webcam.component';
import { ConductorTrackService } from '../../../../services/conductor-track.service';
import { IRegUbicacionRequest } from '../../../../../../core/interfaces/ICommons';
import { Geolocation } from '@capacitor/geolocation';
import { MovilUbicationService } from '../../../../../../core/services/movil-ubication.service';
import { StorageService } from '../../../../../../core/services/storage.service';

@Component({
  selector: 'app-card-tabla-pedidos',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    MatChipsModule,
    EstadoRegistroDetalleComponent,
    MatSnackBarModule,
  ],
  templateUrl: './card-tabla-pedidos.component.html',
  styleUrl: './card-tabla-pedidos.component.css',
})
export class CardTablaPedidosComponent {
  @Input() pedido!: IGetPedidosResponse;
  @Output() changeStateOrder = new EventEmitter<{
    estado: string;
    comentarios?: string;
  }>();
  dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  conductorTrackService = inject(ConductorTrackService);
  cont = 0;
  estadosPosibles = ['EN_TRANSITO', 'ENTREGADO', 'CANCELADO'];
  showDetails = false;
  showBody = false;
  geoServices = inject(MovilUbicationService);
  storage = inject(StorageService);

  takePhoto() {
    console.log('Tomando foto...');

    const dialogRef = this.dialog.open(DialogWebcamComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '800px',
      data: {
        /* datos adicionales si necesitas */
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.ok) {
        // result.imageAsDataUrl - para mostrar la imagen
        // result.imageAsBase64 - para enviar al servidor
        // Enviar imagen al servidor
        this.enviarImagenAlServidor(result.imageAsBase64);
      }
    });
  }
  enviarImagenAlServidor(imageAsBase64: any) {
    let request: IPedidoImagenBase64DtoRequest = {
      imagenBase64: imageAsBase64,
      EstadoPedido: this.pedido.estadoPedido,
    };
    this.conductorTrackService.uploadImagen(this.pedido.id, request).subscribe({
      next: (response) => {
        this._snackBar.open('Imagen enviada exitosamente', 'Cerrar', {
          duration: 3000,
        });
      },
      error: (error) => {
        console.error('Error al enviar la imagen:', error);
        this._snackBar.open('Error al enviar la imagen', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  downloadPdfInvoice() {
    console.log('Descargando PDF de la factura...');
  }

  cancelarPedido() {
    if (this.pedido.estadoPedido === 'CANCELADO') {
      this._snackBar.open('El pedido ya está cancelado', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    console.log('Cancelando pedido...');

    const dialogRef = this.dialog.open(DialogConfirmarEstadoComponent, {
      data: { estado: 'CANCELADO' },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { comentarios: string; ok: boolean }) => {
        if (result.ok) {
          this.pedido.estadoPedido = 'CANCELADO';
          this.changeStateOrder.emit({
            estado: this.pedido.estadoPedido,
            comentarios: result.comentarios,
          });
          this.obtenerYEnviarUbicacion();
        }
      });
  }

  changeState(event: Event) {
    event.stopPropagation();

    if (this.pedido.estadoPedido === 'CANCELADO') {
      this._snackBar.open('No se puede cambiar el estado', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    let nuevoEstadoTmp = this.getNuevoEstado(this.pedido.estadoPedido);

    const dialogRef = this.dialog.open(DialogConfirmarEstadoComponent, {
      data: { estado: nuevoEstadoTmp },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { comentarios: string; ok: boolean }) => {
        if (result.ok) {
          this.pedido.estadoPedido = nuevoEstadoTmp;
          this.changeStateOrder.emit({
            estado: this.pedido.estadoPedido,
            comentarios: result.comentarios,
          });
          this.obtenerYEnviarUbicacion();
        }
      });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  toggleBody() {
    this.showBody = !this.showBody;
  }

  getNuevoEstado(estadoActual: string): string {
    if (estadoActual === 'EN_TRANSITO') {
      return 'ENTREGADO';
    } else if (estadoActual === 'ASIGNADO') {
      return 'EN_TRANSITO';
    } else {
      return 'EN_TRANSITO';
    }
  }

  async obtenerYEnviarUbicacion() {        
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      });

      const { latitude, longitude } = position.coords;
      const timestamp = new Date().toLocaleTimeString();      
      const dispositivoId = await this.storage.get('dispositivoId');
      const ubicacion: IRegUbicacionRequest = {
        dispositivoId: dispositivoId ? Number(dispositivoId) : 0,
        latitud: latitude,
        longitud: longitude,
        fechaHora: new Date(),
      };

      this.geoServices.guardarUbicacion(ubicacion).subscribe({
        next: () => {
          console.log(`[${timestamp}] ✅ Ubicación guardada`);
        },
        error: (error: any) => {
          console.error(`[${timestamp}] ❌ Error guardando:`, error);
        },
      });
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }
}
