import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { searchContainers } from 'src/db_functions/containers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  customDiv: HTMLElement | null = null; 
  constructor() { }

  map!: L.Map;
  markers: L.Marker[] = []; // Array para almacenar los marcadores
  customIcon!: L.Icon;

  ngOnInit() {
    this.initializeMap();
 
  }

  private initializeMap() {
    const customIcon = L.icon({
      iconUrl: '../../assets/img/Marker.png',
      iconSize: [38, 50],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    this.map = L.map('map').setView([39.4697, -0.3774], 50);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Escucha el evento de cambio de vista del mapa
    this.map.on('moveend', () => {
      this.updateMarkers(); // Actualiza los marcadores cuando cambia la vista del mapa
    });

    // Agrega un marcador al mapa usando el icono personalizado
    this.addMarker({ lat: 39.4697, lng: -0.3774 }, 'Ayuntamiento de Valencia', customIcon);

  }

  // Función para agregar un marcador al mapa
  addMarker(latlng: L.LatLngLiteral, popupContent: string, icon: L.Icon) {
    const marker = L.marker(latlng, { icon: icon });
    this.markers.push(marker);
    marker.addTo(this.map);

    marker.on('click', (e) => {
      this.createCustomDiv(e.latlng, popupContent ); // Llama a la función para crear el div
    });

  }

    createCustomDiv(latlng: L.LatLng, popupContent: string) {
      if (this.customDiv) {
        this.customDiv.remove();
      }
  
      // Creamos un nuevo div
      this.customDiv = document.createElement('div');
      this.customDiv.innerHTML = `
        <div style="color: #3a5e62; background-color:#84beb0; font-size: 16px; bottom: 20%;">${popupContent}
        <button onclick="this.parentElement.remove()">Cerrar</button></div>
        `
      ;
  
      // Encuentra el contenedor en el HTML
      const container = document.getElementById('customDivContainer');
  
      // Agrega el div al contenedor
      if (container) {
        container.appendChild(this.customDiv);
      }
    }
  

  

  // Función para actualizar los marcadores basados en los límites del mapa visible
  updateMarkers() {
    const bounds = this.map.getBounds();

    // Filtra los marcadores para mantener solo aquellos dentro de los límites del mapa visible
    const markersInsideBounds = this.markers.filter(marker =>
      bounds.contains(marker.getLatLng())
    );

    // Elimina todos los marcadores del mapa
    this.markers.forEach(marker => marker.remove());

    // Agrega los marcadores filtrados al mapa
    markersInsideBounds.forEach(marker => marker.addTo(this.map));
  }

  selectAll = false;
  items = [
    { id: 'checkbox1', selected: false },
    { id: 'checkbox2', selected: false },
    { id: 'checkbox3', selected: false },
    { id: 'checkbox4', selected: false },
    { id: 'checkbox5', selected: false },
    { id: 'checkbox6', selected: false },
    { id: 'checkbox7', selected: false },
  ];

  toggleAll() {
    this.selectAll = !this.selectAll;
    this.items.forEach(item => item.selected = this.selectAll);
  }
}
