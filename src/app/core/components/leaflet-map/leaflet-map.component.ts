import { Component, OnInit, AfterViewInit, inject, Input } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';
import { IInfoPropMarker } from '../../interfaces/ICommons';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.css',
})
export class LeafletMapComponent {
  private map!: L.Map;
  markerService = inject(MarkerService);

  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  @Input() propiedades: IInfoPropMarker = { unidad: '', nombre: '', direccion: '' };

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();

    this.markerService.makeCapitalMarker(
      this.map,
      this.latitude,
      this.longitude,
      this.propiedades
    );
  }

  private initMap() {
    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom: 3,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }
}
