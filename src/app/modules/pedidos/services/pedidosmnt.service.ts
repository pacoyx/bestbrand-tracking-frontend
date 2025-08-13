import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IResponseGeneric } from '../../../core/interfaces/ICommons';
import {
  ICreateConductorRequest,
  ICreateConductorResponse,
  IListarConductoresPaginadoResponse,
  IListarConductoresToHelpResponse,
  IUpdateConductorRequest,
  IUpdateConductorResponse,
} from '../interfaces/IConductor';
import {
  ICreateVehiculoRequest,
  ICreateVehiculoResponse,
  IGetVehiculosPaginatorResponse,
  IGetVehiculosToHelpResponse,
  IUpdateVehiculoRequest,
  IUpdateVehiculoResponse,
} from '../interfaces/IVehiculo';
import {
  IGetPedidosResponse,
  IPedidoAsigandoV2Rquest,
  IPedidoAsignarRequest,
  IPedidosAsignadosRequest,
} from '../interfaces/IPedidoTrack';
import {
  ICreateEmpresaTransporteRequest,
  ICreateEmpresaTransporteResponse,
  IGetEmpresasTransporteResponse,
  IUpdateEmpresaTransporteRequest,
} from '../interfaces/IEmpresaTransporte';

@Injectable({
  providedIn: 'root',
})
export class PedidosmntService {
  private apiUrl = environment.apiUrlBase;
  constructor(private http: HttpClient) {}

  // ASIGNACION DE PEDIDOS ==================
  asignarPedido(
    idPedido: number,
    data: IPedidoAsignarRequest
  ): Observable<IResponseGeneric<IPedidoAsignarRequest>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IResponseGeneric<IPedidoAsignarRequest>>(
      `${this.apiUrl}${environment.EPAsignarPedido}/${idPedido}`,
      data,
      { headers }
    );
  }

  asignarPedidoMasivo(
    req: IPedidoAsigandoV2Rquest
  ): Observable<IResponseGeneric<IPedidoAsignarRequest>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IResponseGeneric<IPedidoAsignarRequest>>(
      `${this.apiUrl}${environment.EPAsignarPedidoMasivo}`,
      req,
      { headers }
    );
  }

  listarPedidos(
    fecha: string
  ): Observable<IResponseGeneric<IGetPedidosResponse[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = { fecha };
    return this.http.get<IResponseGeneric<IGetPedidosResponse[]>>(
      `${this.apiUrl}${environment.EPListarPedidos}`,
      { headers, params }
    );
  }

  // CONDUCTOR ============

  listarConductoresPaginado(
    page: number,
    pageSize: number,
    filtro: string
  ): Observable<IResponseGeneric<IListarConductoresPaginadoResponse[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = { nombreConductor: filtro };
    return this.http.get<
      IResponseGeneric<IListarConductoresPaginadoResponse[]>
    >(
      `${this.apiUrl}${environment.EPListarConductoresPaginado}/${page}/${pageSize}`,
      { headers, params }
    );
  }

  listarConductoresToHelp(): Observable<
    IResponseGeneric<IListarConductoresToHelpResponse[]>
  > {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<IResponseGeneric<IListarConductoresToHelpResponse[]>>(
      `${this.apiUrl}${environment.EPListarConductoresToHelp}`,
      { headers }
    );
  }

  createConductor(
    data: ICreateConductorRequest
  ): Observable<IResponseGeneric<ICreateConductorResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IResponseGeneric<ICreateConductorResponse>>(
      `${this.apiUrl}${environment.EPCreateConductor}`,
      data,
      { headers }
    );
  }

  updateConductor(
    data: IUpdateConductorRequest
  ): Observable<IResponseGeneric<IUpdateConductorResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IResponseGeneric<IUpdateConductorResponse>>(
      `${this.apiUrl}${environment.EPUpdateConductor}/${data.id}`,
      data,
      { headers }
    );
  }

  deleteConductor(id: number): Observable<IResponseGeneric<boolean>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<IResponseGeneric<boolean>>(
      `${this.apiUrl}${environment.EPDeleteConductor}/${id}`,
      { headers }
    );
  }

  // VEHICULOS ========================

  getVehiculosPaginator(
    page: number,
    pageSize: number,
    filtro: string
  ): Observable<IResponseGeneric<IGetVehiculosPaginatorResponse[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = { placa: filtro };
    return this.http.get<IResponseGeneric<IGetVehiculosPaginatorResponse[]>>(
      `${this.apiUrl}${environment.EPGetVehiculosPaginator}/${page}/${pageSize}`,
      { headers, params }
    );
  }

  getVehiculos(): Observable<
    IResponseGeneric<IGetVehiculosPaginatorResponse[]>
  > {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<IResponseGeneric<IGetVehiculosPaginatorResponse[]>>(
      `${this.apiUrl}${environment.EPGetVehiculos}`,
      { headers }
    );
  }

  getVehiculosToHelp(): Observable<
    IResponseGeneric<IGetVehiculosToHelpResponse[]>
  > {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<IResponseGeneric<IGetVehiculosToHelpResponse[]>>(
      `${this.apiUrl}${environment.EPGetVehiculosToHelp}`,
      { headers }
    );
  }

  getVehiculo(): Observable<IResponseGeneric<IGetVehiculosPaginatorResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<IResponseGeneric<IGetVehiculosPaginatorResponse>>(
      `${this.apiUrl}${environment.EPGetVehiculo}`,
      { headers }
    );
  }

  createVehiculo(
    data: ICreateVehiculoRequest
  ): Observable<IResponseGeneric<ICreateVehiculoResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IResponseGeneric<ICreateVehiculoResponse>>(
      `${this.apiUrl}${environment.EPCreateVehiculo}`,
      data,
      { headers }
    );
  }

  updateVehiculo(
    data: IUpdateVehiculoRequest
  ): Observable<IResponseGeneric<IUpdateVehiculoResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IResponseGeneric<IUpdateVehiculoResponse>>(
      `${this.apiUrl}${environment.EPCreateVehiculo}/${data.id}`,
      data,
      { headers }
    );
  }

  deleteVehiculo(id: number): Observable<IResponseGeneric<boolean>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<IResponseGeneric<boolean>>(
      `${this.apiUrl}${environment.EPDeleteVehiculo}/${id}`,
      { headers }
    );
  }

  // EMPRESA TRANSPORTE ============
  getEmpresasTransporte(): Observable<
    IResponseGeneric<IGetEmpresasTransporteResponse[]>
  > {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<IResponseGeneric<IGetEmpresasTransporteResponse[]>>(
      `${this.apiUrl}${environment.EPGetEmpresasTransporte}`,
      { headers }
    );
  }

  getEmpresasTransportePaginado(
    page: number,
    pageSize: number,
    filtro: string
  ): Observable<IResponseGeneric<IGetEmpresasTransporteResponse[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = { razonSocial: filtro };
    return this.http.get<IResponseGeneric<IGetEmpresasTransporteResponse[]>>(
      `${this.apiUrl}${environment.EPGetEmpresasTransportePaginator}/${page}/${pageSize}`,
      { headers, params }
    );
  }

  getEmpresasTransporteToHelp(): Observable<
    IResponseGeneric<IGetEmpresasTransporteResponse[]>
  > {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<IResponseGeneric<IGetEmpresasTransporteResponse[]>>(
      `${this.apiUrl}${environment.EPGetEmpresasTransporteToHelp}`,
      { headers }
    );
  }

  createEmpresaTransporte(
    data: ICreateEmpresaTransporteRequest
  ): Observable<IResponseGeneric<ICreateEmpresaTransporteResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IResponseGeneric<ICreateEmpresaTransporteResponse>>(
      `${this.apiUrl}${environment.EPCreateEmpresaTransporte}`,
      data,
      { headers }
    );
  }
  updateEmpresaTransporte(
    data: IUpdateEmpresaTransporteRequest
  ): Observable<IResponseGeneric<boolean>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IResponseGeneric<boolean>>(
      `${this.apiUrl}${environment.EPUpdateEmpresaTransporte}/${data.id}`,
      data,
      { headers }
    );
  }
}
