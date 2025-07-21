import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageConductoresComponent } from './pages/page-conductores/page-conductores.component';
import { PageVehiculosComponent } from './pages/page-vehiculos/page-vehiculos.component';
import { PageTrackPedidosComponent } from './pages/page-track-pedidos/page-track-pedidos.component';
import { PageReportesComponent } from './pages/page-reportes/page-reportes.component';

const routes: Routes = [
  { path: '', redirectTo: 'trackpedidos', pathMatch: 'full' },
  { path: 'trackpedidos', component: PageTrackPedidosComponent },
  { path: 'conductor', component: PageConductoresComponent },
  { path: 'vehiculo', component: PageVehiculosComponent },
  { path: 'reportes', component: PageReportesComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
