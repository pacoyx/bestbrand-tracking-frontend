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
  registros: IPedidoRegistros[];
}

export interface IPedidoRegistros {
  id: number;  
  fechaRegistro: string;
  estadoRegistro: string;
  comentarios: string;  
}

export interface IActualizarEstadoPedidoRequest {
  pedidoId: number;
  estadoPedido: string;
  comentarios: string;
  fechaEntrega: string;
  nombreFoto: string;
  conductorId: number;
}
