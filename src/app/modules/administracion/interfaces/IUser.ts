
export interface IGetUsersPaginadoResponse {
    id: number;
    username: string;
    role: string;
    conductorId: number;
    conductor: string;
    estado: string;
}

export interface ICreateUsuarioRequest {
    username: string;
    password: string;
    role: string;
    conductorId: number;
}

export interface ICreateUsuarioResponse {
    id: number;
    username: string;
    password: string;
    role: string;
    conductorId: number;
}

export interface IUpdateUsuarioRequest {
    id: number;
    username: string;
    password: string;
    role: string;
    conductorId: number;
    estado: string;
}

export interface IUpdateUsuarioResponse {
    id: number;
    username: string;
    password: string;
    role: string;
    conductorId: number;
    estado: string;
}

export interface IGetConductoresToHelpResponse {
  id: number;
  nombre: string;
}