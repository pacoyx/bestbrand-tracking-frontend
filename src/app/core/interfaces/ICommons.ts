export interface IResponseGeneric<T> {
    success: boolean;
    message: string;
    data: T;
    errors: string[];
    totalCount: number
}

export interface IRegDispositivoRequest {
  identificador: string;
  usuarioId: number;
}

export interface IRegDispositivoResponse {
  id: number;
  identificador: string;
  usuarioId: number;
}

export interface IRegUbicacionRequest {
  latitud: number;
  longitud: number;
  fechaHora: Date;
  dispositivoId: number;
}

export interface IInfoPropMarker {  
  unidad: string;
  nombre: string;  
  direccion:string;
}