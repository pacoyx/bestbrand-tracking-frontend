import { Component, Inject } from '@angular/core';
import { WebcamModule, WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dialog-webcam',
  standalone: true,
  imports: [
    WebcamModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './dialog-webcam.component.html',
  styleUrl: './dialog-webcam.component.css',
})
export class DialogWebcamComponent {
  // Observable para disparar la captura de foto
  private trigger: Subject<void> = new Subject<void>();

  // La imagen capturada
  public webcamImage: WebcamImage | null = null;

  // Estado de la cámara
  public showWebcam = true;
  public errors: WebcamInitError[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogWebcamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Método para tomar la foto
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  // Callback cuando se captura la imagen
  public handleImage(webcamImage: WebcamImage): void {
    console.info('Imagen capturada:', webcamImage);
    this.webcamImage = webcamImage;
    this.showWebcam = false; // Ocultar cámara después de tomar la foto
  }

  // Callback para errores de inicialización
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
    console.error('Error inicializando webcam:', error);
  }

  // Observable para el trigger
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  // Retomar otra foto
  public retakePhoto(): void {
    this.webcamImage = null;
    this.showWebcam = true;
  }

  // Cancelar operación
  cancelar(): void {
    this.dialogRef.close({ ok: false });
  }

  // Confirmar y enviar la imagen
  confirmar(): void {
    if (this.webcamImage) {
      this.dialogRef.close({
        ok: true,
        imageAsDataUrl: this.webcamImage.imageAsDataUrl,
        imageAsBase64: this.webcamImage.imageAsBase64,
      });
    } else {
      // Si no hay imagen, cerrar sin datos
      this.dialogRef.close({ ok: false });
    }
  }
}
