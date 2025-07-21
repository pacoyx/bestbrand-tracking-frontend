export interface IGetEmpresasTransporteResponse {
  id: number;
  ruc: string;
  razonSocial: string;
  direccion: string;
  telefono: string;
  email: string;
  estadoRegistro: string;
}

export interface IGetEmpresasTransporteToHelpResponse {
  id: number;
  razonSocial: string;
}

export interface ICreateEmpresaTransporteRequest {
  ruc: string;
  razonSocial: string;
  direccion: string;
  telefono: string;
  email: string;
}

export interface ICreateEmpresaTransporteResponse {
  id: number;
  ruc: string;
  razonSocial: string;
  direccion: string;
  telefono: string;
  email: string;
  estadoRegistro: string;
}

export interface IUpdateEmpresaTransporteRequest {
  id: number;
  ruc: string;
  razonSocial: string;
  direccion: string;
  telefono: string;
  email: string;
  estadoRegistro: string;
}