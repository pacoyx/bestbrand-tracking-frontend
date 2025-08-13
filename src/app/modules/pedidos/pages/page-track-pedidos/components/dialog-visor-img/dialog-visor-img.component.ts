import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConductorTrackService } from '../../../../../conductor/services/conductor-track.service';
@Component({
  selector: 'app-dialog-visor-img',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-visor-img.component.html',
  styleUrl: './dialog-visor-img.component.css',
})
export class DialogVisorImgComponent implements OnInit {
  conductorService = inject(ConductorTrackService);
  imagenUrl: string | null = null;
  loadingImage = false;
  
  constructor(
    public dialogRef: MatDialogRef<DialogVisorImgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombreFoto: string }
  ) {}

  ngOnInit(): void {
    this.cargarImagen(this.data.nombreFoto);
  }

  cargarImagen(nombreFoto: string) {
    // Lógica para ver la imagen
    this.loadingImage = true;

    this.conductorService.obtenerImagenPorPedido(nombreFoto).subscribe({
      next: (blob) => {
        this.imagenUrl = URL.createObjectURL(blob);
        this.loadingImage = false;
      },
      error: (err) => {
        console.log('Error al cargar la imagen', err);
        this.loadingImage = false;
      },
    });
  }
}
