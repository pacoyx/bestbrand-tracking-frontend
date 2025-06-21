import { Routes } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';
import { LayoutPedidosComponent } from './core/layouts/layout-pedidos/layout-pedidos.component';
import { LayoutConductorComponent } from './core/layouts/layout-conductor/layout-conductor.component';
import { LayoutAdministracionComponent } from './core/layouts/layout-administracion/layout-administracion.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'pedidos', component: LayoutPedidosComponent, children: [
            { path: '', loadChildren: () => import('./modules/pedidos/pedidos.module').then(m => m.PedidosModule) },
        ]
    },

    {
        path: 'conductor', component: LayoutConductorComponent, children: [
            { path: '', loadChildren: () => import('./modules/conductor/conductor.module').then(m => m.ConductorModule) },
        ]
    },

    {
        path: 'administracion', component: LayoutAdministracionComponent, children: [
            { path: '', loadChildren: () => import('./modules/administracion/administracion.module').then(m => m.AdministracionModule) },
        ]
    },
];