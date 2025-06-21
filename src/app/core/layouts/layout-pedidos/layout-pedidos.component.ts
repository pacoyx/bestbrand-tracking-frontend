import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToggleStoreService } from '../../services/toggle-store.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout-pedidos',
  standalone: true,
  imports: [
    RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatMenuModule,
    MatSidenav, MatSidenavModule
  ],
  templateUrl: './layout-pedidos.component.html',
  styleUrl: './layout-pedidos.component.css'
})
export class LayoutPedidosComponent {

@ViewChild('sidenav') sidenav!: MatSidenav;

constructor(
    private router: Router,
    private toggleStore: ToggleStoreService
  ) { }

  cerrarSesion() {
    localStorage.removeItem('bbtrack');
    this.router.navigate(['/login']);
    this.toggleStore.setToggleState(false);
  }


  toggleSidenav() {
    this.toggleStore.setToggleState(true);
  }

  toggle() {       
    // this.toggleStore.setToggleState(false);
    this.sidenav.toggle();
  }

}
