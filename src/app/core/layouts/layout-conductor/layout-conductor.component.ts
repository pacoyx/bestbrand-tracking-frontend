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
import { AvatarComponent } from '../components/avatar/avatar.component';
@Component({
  selector: 'app-layout-conductor',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatMenuModule,
    MatSidenav, MatSidenavModule, AvatarComponent],
  templateUrl: './layout-conductor.component.html',
  styleUrl: './layout-conductor.component.css'
})
export class LayoutConductorComponent {
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




  onNotifications() {
    console.log('Notificaciones clicked');
    // Implementar lógica de notificaciones
    // Ejemplo: mostrar badge de notificaciones
  }

  onRefresh() {
    console.log('Refresh clicked');
    // Implementar lógica de refresh con feedback visual
    // Ejemplo: mostrar spinner temporal
  }
}
