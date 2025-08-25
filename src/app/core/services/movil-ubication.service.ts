import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { environment } from '../../../environments/environment';
import {
  IRegDispositivoRequest,
  IRegDispositivoResponse,
  IRegUbicacionRequest,
  IResponseGeneric,
} from '../interfaces/ICommons';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovilUbicationService {
  private apiUrl = environment.apiUrlBase;

  constructor(private http: HttpClient) {}

  async getDeviceId(): Promise<string> {
    const info = await Device.getId();
    return info.identifier; // Este es único por instalación
  }

  registrarDispositivo(
    req: IRegDispositivoRequest
  ): Observable<IResponseGeneric<IRegDispositivoResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IResponseGeneric<IRegDispositivoResponse>>(
      `${this.apiUrl}${environment.EPRegistrarDispositivo}`,
      req,
      { headers }
    );
  }

  guardarUbicacion(ubicacion: IRegUbicacionRequest) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiUrl}${environment.EPRegistrarUbicacion}`,
      ubicacion,
      { headers }
    );
  }
}
