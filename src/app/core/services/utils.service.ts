import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private apiUrl = environment.apiUrlBase;

  constructor(private http: HttpClient) {}

  getPdfByPedido(numeroPedido: string) {
    return this.http.get(
      `${this.apiUrl}${environment.EPObtenerFacturaPdfPorPedido}/${numeroPedido}`,
      { responseType: 'blob' }
    );
  }
}
