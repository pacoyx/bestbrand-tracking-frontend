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