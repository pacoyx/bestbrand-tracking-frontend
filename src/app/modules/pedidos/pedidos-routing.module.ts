import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageConductoresComponent } from './pages/page-conductores/page-conductores.component';
import { PageVehiculosComponent } from './pages/page-vehiculos/page-vehiculos.component';
import { PageTrackPedidosComponent } from './pages/page-track-pedidos/page-track-pedidos.component';
import { PageReportesComponent } from './pages/page-reportes/page-reportes.component';
import { PageAsignarPedidoComponent } from './pages/page-asignar-pedido/page-asignar-pedido.component';
import { PageTrackMapComponent } from './pages/page-track-map/page-track-map.component';
import { PageViewPedidosComponent } from './pages/page-view-pedidos/page-view-pedidos.component';

const routes: Routes = [
  { path: '', redirectTo: 'tracking', pathMatch: 'full' },
  { path: 'tracking', component: PageTrackPedidosComponent },
  { path: 'asignar', component: PageAsignarPedidoComponent },
  { path: 'conductor', component: PageConductoresComponent },
  { path: 'vehiculo', component: PageVehiculosComponent },
  { path: 'reportes', component: PageReportesComponent },
  { path: 'tracking-map', component: PageTrackMapComponent },
  { path: 'ver-pedidos', component: PageViewPedidosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosRoutingModule {}
