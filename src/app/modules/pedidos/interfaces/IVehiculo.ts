export interface ICreateVehiculoRequest {
    placa: string;
    marca: string;
    modelo: string;
    anio: number;
}

export interface ICreateVehiculoResponse {
    id: number;
    placa: string;
    marca: string;
    modelo: string;
    anio: number;
    estado:string;
}

export interface IUpdateVehiculoRequest {
    id: number;
    placa: string;
    marca: string;
    modelo: string;
    anio: number;
    estado:string;
}

export interface IUpdateVehiculoResponse {
    id: number;
    placa: string;
    marca: string;
    modelo: string;
    anio: number;
    estado:string;
}

export interface IGetVehiculosPaginatorResponse {
    id: number;
    placa: string;
    marca: string;
    modelo: string;
    anio: number;
    estado:string;
}

export interface IGetVehiculosToHelpResponse {
  id: number;
  placa: string;
}