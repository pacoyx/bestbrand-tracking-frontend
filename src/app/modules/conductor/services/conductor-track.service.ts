import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseGeneric } from '../../../core/interfaces/ICommons';
import { environment } from '../../../../environments/environment';
import {
  IActualizarEstadoPedidoRequest,
  IGetPedidosResponse,
} from '../interfaces/IOperaciones';

@Injectable({
  providedIn: 'root',
})
export class ConductorTrackService {
  private apiUrl = environment.apiUrlBase;
  constructor(private http: HttpClient) {}

  // OPERACIONES DE PEDIDOS ==================
  actualizarEstadoPedido(
    idPedido: number,
    data: IActualizarEstadoPedidoRequest
  ): Observable<IResponseGeneric<boolean>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IResponseGeneric<boolean>>(
      `${this.apiUrl}${environment.EPActualizarEstadoPedido}/${idPedido}`,
      data,
      { headers }
    );
  }

  listarPedidos(
    fecha: string,
    driverId: number
  ): Observable<IResponseGeneric<IGetPedidosResponse[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = { fecha };
    return this.http.get<IResponseGeneric<IGetPedidosResponse[]>>(
      `${this.apiUrl}${environment.EPListarPedidosPorConductor}/${driverId}`,
      { headers, params }
    );
  }

obtenerFacturaPdfPorPedido(
    idPedido: string
  ): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}${environment.EPObtenerFacturaPdfPorPedido}/${idPedido}`, {
      headers,
      responseType: 'blob',
    });
  }

}
