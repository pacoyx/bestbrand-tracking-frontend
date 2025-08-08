import { provideExperimentalZonelessChangeDetection } from "@angular/core";

export const environment = {
    production: false,
    apiUrlBase: 'http://localhost:5000',
    EPlogin: '/api/auth/login',
    EPListarConductoresPaginado: '/api/v1/conductores',
    EPObtenerConductor: '/api/v1/conductores',
    EPCreateConductor: '/api/v1/conductores',
    EPUpdateConductor: '/api/v1/conductores',
    EPDeleteConductor: '/api/v1/conductores',
    EPListarConductoresToHelp: '/api/v1/conductores/toHelp',

    EPGetVehiculos: '/api/v1/vehiculos',
    EPGetVehiculo: '/api/v1/vehiculos',
    EPGetVehiculosPaginator: '/api/v1/vehiculos',
    EPCreateVehiculo: '/api/v1/vehiculos',
    EPUpdateVehiculo: '/api/v1/vehiculos',
    EPDeleteVehiculo: '/api/v1/vehiculos',
    EPGetVehiculosToHelp: '/api/v1/vehiculos/toHelp',


    EPGetUsersPaginado: '/api/v1/user',
    EPGetUsers: '/api/v1/user',
    EPGetUser: '/api/v1/user',
    EPCreateUser: '/api/v1/user',
    EPUpdateUser: '/api/v1/user',
    EPDeleteUser: '/api/v1/user',

    EPAsignarPedido: '/api/v1/pedidos/asignar',
    EPListarPedidos: '/api/v1/pedidos',
    EPActualizarEstadoPedido: '/api/v1/pedidos/actualizar',
    EPListarPedidosPorConductor: '/api/v1/pedidos/byConductor',
    EPObtenerFacturaPdfPorPedido: '/api/v1/pedidos/pdf/facturaPdfByPedido',

    EPGetEmpresasTransporte: '/api/v1/empresas-transporte',
    EPGetEmpresasTransporteToHelp: '/api/v1/empresas-transporte',
    EPGetEmpresasTransportePaginator: '/api/v1/empresas-transporte',
    EPCreateEmpresaTransporte: '/api/v1/empresas-transporte',
    EPUpdateEmpresaTransporte: '/api/v1/empresas-transporte',

};
// ng build --configuration=production --base-href "/apptracking/"