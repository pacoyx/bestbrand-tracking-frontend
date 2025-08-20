export interface IPedidoTrack {
      nropedido: string;
      cliente: string;
      direntrega: string;
      ubigeo: string;
      docguia: string;
      transportista: string;
      estadopedido: string;
      actions: string;
    }


 export interface IGetPedidosResponse {
  id: number;
  serie: string;
  numero: string;
  fechaPedido: string;
  clienteId: string;
  cliente: string;
  direccionEntrega: string;
  departamento: string;
  provincia: string;
  distrito: string;
  serieGuia: string;
  numeroGuia: string;
  transEmpresa: string;
  transConductor: string;
  transVehiculo: string;
  estadoPedido: string;
  fechaEntrega: string;
  estadoRegistro: string;
  prioridad: number;
  empresaTransporteId: number;
  conductorId: number;
  vehiculoId: number;
  comentarios?: string;
}

export interface IGetPedidosAsignarResponse {
  id: number;
  serie: string;
  numero: string;
  fechaPedido: string;
  clienteId: string;
  cliente: string;
  direccionEntrega: string;  
  transEmpresa: string;
  transConductor: string;
  transVehiculo: string;
  estadoPedido: string;    
  prioridad: number;
  empresaTransporteId: number;
  conductorId: number;
  vehiculoId: number;  
}

export interface IPedidoAsignarRequest {
  transEmpresa: string;
  transConductor: string;
  transVehiculo: string;
  estadoPedido: string;
  prioridad: number;
  empresaTransporteId: number;
  conductorId: number;
  vehiculoId: number;
  comentarios?: string;
}

export interface IDataTransporteAsignarRequest {
  transEmpresa: string;
  transConductor: string;
  transVehiculo: string;  
  empresaTransporteId: number;
  conductorId: number;
  vehiculoId: number;
  comentarios?: string;
}


export interface IPedidosAsignadosRequest{
  pedidoId:number;
  prioridad:number;
}

export interface IPedidoAsigandoV2Rquest{
  DataTransporte: IDataTransporteAsignarRequest,
  DataPedidosAsignados: IPedidosAsignadosRequest[],
}


export interface IGetCoorByUserResponse {
  id: number;
  fecha: string;
  latitud: number;
  longitud: number;
  dispositivoId: number;
}

export interface IGetUbicacionConductoresResponse {
  nombreConductor: string;
  usuarioId: number;
  estadoRegistro: string;
  fechaRegistro: string;
  placaVehiculo: string;
  numeroPedido: string;
}