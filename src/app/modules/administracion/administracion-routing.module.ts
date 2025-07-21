import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageUsuariosComponent } from './pages/page-usuarios/page-usuarios.component';
import { PageEmpresaComponent } from './pages/page-empresa/page-empresa.component';

const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: PageUsuariosComponent, title: 'Usuarios - Administracion' },
  { path: 'empresas', component: PageEmpresaComponent, title: 'Empresas - Administracion' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
