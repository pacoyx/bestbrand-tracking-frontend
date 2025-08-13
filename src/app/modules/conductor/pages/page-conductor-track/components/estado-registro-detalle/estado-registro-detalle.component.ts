import { Component, inject, Input } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { IPedidoRegistros } from '../../../../interfaces/IOperaciones';
import { DatePipe } from '@angular/common';
import { ConductorTrackService } from '../../../../services/conductor-track.service';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from '../../../../../../core/components/loading/loading.component';

@Component({
  selector: 'app-estado-registro-detalle',
  standalone: true,
  imports: [MatStepperModule, DatePipe, MatButtonModule, LoadingComponent],
  templateUrl: './estado-registro-detalle.component.html',
  styleUrl: './estado-registro-detalle.component.css',
})
export class EstadoRegistroDetalleComponent {
  conductorService = inject(ConductorTrackService);
  @Input() registros: IPedidoRegistros[] = [];
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
  isLinear = false;
  imagenUrl: string | null = null;
  loadingImage = false;
  showImagen = false;

  verImagen(nombreFoto: string) {
    // Lógica para ver la imagen
    this.loadingImage = true;
    this.showImagen = false;
    this.conductorService.obtenerImagenPorPedido(nombreFoto).subscribe({
      next: (blob) => {
        this.imagenUrl = URL.createObjectURL(blob);
        this.loadingImage = false;
        this.showImagen = true;
      },
      error: (err) => {
        console.log('Error al cargar la imagen', err);
        this.loadingImage = false;
        this.showImagen = false;
      },
    });
  }
}
