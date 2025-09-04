export interface IResponseGeneric<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
  totalCount: number;
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
  direccion: string;
}

export interface TrackingPedxConductorResponse {
  conductorId: number;
  nombreConductor: string;
  placaVehiculo: string;
  pedidoInfo: PedidoInfo[];
}

export interface PedidoInfo {
  pedidoId: string;
  numeroPedido: string;
  fechaPedido: string;
  prioridad: number;
  estados: TrackEstado[];
}

export interface TrackEstado {
  fechaRegistro: string;
  estadoRegistro: string;
  comentarios: string;
  latitudEntrega: number;
  longitudEntrega: number;
}
