import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupmapService } from './popupmap.service';
import { IInfoPropMarker } from '../interfaces/ICommons';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';
  popupService = inject(PopupmapService);

  constructor(private http: HttpClient) {}

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  makeCapitalMarker(map: L.Map, lat: number, lon: number, propiedades: IInfoPropMarker) : void {
    const carIcon = L.icon({
      iconUrl: 'truck_32x32.svg',
      iconSize: [32, 32], // ancho, alto
      iconAnchor: [16, 16], // punto de anclaje (centro del ícono)
      popupAnchor: [0, -16], // posición del popup respecto al ícono
    });

    const marker = L.marker([lat, lon], { icon: carIcon });
    marker.bindPopup(this.popupService.makeDriverPopup(propiedades));

    const etiquetDireccion = `Placa: ${propiedades.unidad} | ${propiedades.direccion}`;
  const tooltipContent = `
    <div class="custom-tooltip-content">
      <div class="placa-info">Placa: ${propiedades.unidad}</div>
      <div class="direccion-info">${propiedades.direccion}</div>
    </div>
  `;

    marker.bindTooltip(tooltipContent, {
      permanent: true,
      direction: 'top',
      offset: [0, -10],
      className: 'map-car-label',      
    });

    marker.addTo(map);

    const bounds = L.latLngBounds([marker.getLatLng()]);
    map.fitBounds(bounds);

    map.setZoom(map.getZoom() - 1);
  }

  makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);

        marker.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        marker.addTo(map);
      }
    });
  }

  makeCapitalCircleMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      const maxPop = Math.max(
        ...res.features.map((x: any) => x.properties.population),
        0
      );

      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        // const circle = L.circleMarker([lat, lon]);
        const circle = L.circleMarker([lat, lon], {
          radius: MarkerService.scaledRadius(c.properties.population, maxPop),
        });

        circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        circle.addTo(map);
      }
    });
  }
}
