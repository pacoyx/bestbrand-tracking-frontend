import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginRequest, ILoginResponse } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrlBase;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<ILoginResponse> {
    const body: ILoginRequest = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ILoginResponse>(
      this.apiUrl + environment.EPlogin,
      body,
      { headers }
    );
  }

  getCurrentUser() {
    // Aquí puedes implementar la lógica para obtener el usuario actual
    const user = JSON.parse(localStorage.getItem('bbtrack') || '{}');

    return {
      driverId: user.conductorId,
      username: user.nombre,
      userId: user.idUser,
      roles: user.role,
    };
  }
}
