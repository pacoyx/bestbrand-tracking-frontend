import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Geolocation, Position } from '@capacitor/geolocation';
import { DeviceDetectionService } from '../../services/device-detection.service';
import { MovilUbicationService } from '../../services/movil-ubication.service';
import { IRegUbicacionRequest } from '../../interfaces/ICommons';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-layout-conductor',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatSidenav,
    MatSidenavModule,
    AvatarComponent,
  ],
  templateUrl: './layout-conductor.component.html',
  styleUrl: './layout-conductor.component.css',
})
export class LayoutConductorComponent implements OnInit, OnDestroy {
  isMobile = false;
  sidenavOpened = false;
  private locationInterval: any;
  private lastLocationSent: number = 0;
  private readonly INTERVAL_MS = 15000; // 15 segundos

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private toggleStore: ToggleStoreService,
    private geoServices: MovilUbicationService,
    private storage: StorageService
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
        if (!this.isMobile) {
          this.sidenavOpened = false;
        }
      });
  }

  ngOnInit(): void {
    this.iniciarSeguimientoUbicacion();
  }

  ngOnDestroy(): void {
    this.detenerSeguimientoUbicacion();
  }

  iniciarSeguimientoUbicacion() {
    // Enviar ubicación inmediatamente
    this.obtenerYEnviarUbicacion();

    // Configurar intervalo fijo
    this.locationInterval = setInterval(() => {
      this.obtenerYEnviarUbicacion();
    }, this.INTERVAL_MS);

    console.log('Seguimiento iniciado - cada 15 segundos');
  }
  
  async obtenerYEnviarUbicacion() {
    // Control adicional de tiempo (por seguridad)
    const now = Date.now();
    if (
      this.lastLocationSent > 0 &&
      now - this.lastLocationSent < this.INTERVAL_MS - 1000
    ) {
      console.log('Omitiendo - tiempo insuficiente');
      return;
    }

    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      });

      const { latitude, longitude } = position.coords;
      const timestamp = new Date().toLocaleTimeString();

      console.log(
        `[${timestamp}] Enviando ubicación: ${latitude}, ${longitude}`
      );

      const dispositivoId = await this.storage.get('dispositivoId');

      const ubicacion: IRegUbicacionRequest = {
        dispositivoId: dispositivoId ? Number(dispositivoId) : 0,
        latitud: latitude,
        longitud: longitude,
        fechaHora: new Date(),
      };

      this.geoServices.guardarUbicacion(ubicacion).subscribe({
        next: (response) => {
          this.lastLocationSent = now;
          console.log(`[${timestamp}] ✅ Ubicación guardada`);
        },
        error: (error) => {
          console.error(`[${timestamp}] ❌ Error guardando:`, error);
        },
      });
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }

  detenerSeguimientoUbicacion() {
    if (this.locationInterval) {
      clearInterval(this.locationInterval);
      this.locationInterval = null;
      console.log('Seguimiento detenido');
    }
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
