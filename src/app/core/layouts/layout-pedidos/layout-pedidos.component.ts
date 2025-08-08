import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToggleStoreService } from '../../services/toggle-store.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AvatarComponent } from "../components/avatar/avatar.component";

@Component({
  selector: 'app-layout-pedidos',
  standalone: true,
  imports: [
    RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatMenuModule,
    MatSidenav, MatSidenavModule,
    AvatarComponent, AvatarComponent
],
  templateUrl: './layout-pedidos.component.html',
  styleUrl: './layout-pedidos.component.css'
})
export class LayoutPedidosComponent {

  isMobile = false;
  sidenavOpened = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private toggleStore: ToggleStoreService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
        if (!this.isMobile) {
          this.sidenavOpened = false;
        }
      });
  }

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

  openSidenav() {
    this.sidenavOpened = true;
    this.sidenav.open();
  }

}
