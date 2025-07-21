export interface IListarConductoresPaginadoResponse {
  id: number;
  nombre: string;
  licencia: string;
  telefono: string;
  email: string;
  estado: string;
  docIdentidad: string;
  empTransNombre: string;
  empTransRuc: string;
}

export interface IListarConductoresToHelpResponse {
  id: number;
  nombre: string;
}

export interface ICreateConductorRequest {
  nombre: string;
  licencia: string;
  telefono: string;
  email: string;
  docIdentidad: string;
  empTransNombre: string;
  empTransRuc: string;
}

export interface ICreateConductorResponse {
  id: number;
  nombre: string;
  licencia: string;
  telefono: string;
  email: string;
  docIdentidad: string;
  empTransNombre: string;
  empTransRuc: string;
}

export interface IUpdateConductorRequest {
  id: number;
  nombre: string;
  licencia: string;
  telefono: string;
  email: string;
  docIdentidad: string;
  empTransNombre: string;
  empTransRuc: string;
}

export interface IUpdateConductorResponse {
  id: number;
  nombre: string;
  licencia: string;
  telefono: string;
  email: string;
  docIdentidad: string;
  empTransNombre: string;
  empTransRuc: string;
}