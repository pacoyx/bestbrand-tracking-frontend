import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateUsuarioRequest, ICreateUsuarioResponse, IGetConductoresToHelpResponse, IGetUsersPaginadoResponse, IUpdateUsuarioRequest, IUpdateUsuarioResponse } from '../interfaces/IUser';
import { IResponseGeneric } from '../../../core/interfaces/ICommons';


@Injectable({
  providedIn: 'root'
})
export class AdminModService {

  private apiUrl = environment.apiUrlBase;
  constructor(private http: HttpClient) { }



  // USUARIOS ==================

  getUsersPaginado(page: number, pageSize: number, filtro: string): Observable<IResponseGeneric<IGetUsersPaginadoResponse[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = { userName: filtro };
    return this.http.get<IResponseGeneric<IGetUsersPaginadoResponse[]>>(`${this.apiUrl}${environment.EPGetUsersPaginado}/${page}/${pageSize}`, { headers, params });
  }

  getUsers() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}${environment.EPGetUsers}`, { headers });
  }

  getUser(id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}${environment.EPGetUser}/${id}`, { headers });
  }

  createUser(data: ICreateUsuarioRequest): Observable<IResponseGeneric<ICreateUsuarioResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IResponseGeneric<ICreateUsuarioResponse>>(`${this.apiUrl}${environment.EPCreateUser}`, data, { headers });
  }

  updateUser(data: IUpdateUsuarioRequest): Observable<IResponseGeneric<IUpdateUsuarioResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IResponseGeneric<IUpdateUsuarioResponse>>(`${this.apiUrl}${environment.EPUpdateUser}/${data.id}`, data, { headers });
  }

  deleteUser(id: number): Observable<IResponseGeneric<boolean>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<IResponseGeneric<boolean>>(`${this.apiUrl}${environment.EPDeleteUser}/${id}`, { headers });
  }

  getConductoresToHelp(): Observable<IResponseGeneric<IGetConductoresToHelpResponse[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<IResponseGeneric<IGetConductoresToHelpResponse[]>>(`${this.apiUrl}${environment.EPListarConductoresToHelp}`, { headers });
  }

}
