import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';

// Importa heatLayer específicamente desde el paquete de Leaflet-Heat
import 'leaflet.heat/dist/leaflet-heat';

@Component({
  selector: 'app-mapa-calor',
  templateUrl: './mapa-calor.component.html',
  styleUrls: ['./mapa-calor.component.scss'],
})
export class mapaCalorComponent implements OnInit {

    map!: L.Map;

    constructor() { }
  
    ngOnInit(): void {

        setTimeout(() => {
            this.initMap();
          }, 500);
      
    }
  
    private initMap(): void {
        this.map = L.map('map', {
            zoomControl: false // Desactiva el control de zoom predeterminado
          }).setView([39.4697, -0.3774], 50);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
  
      // Ejemplo de datos para el mapa de calor
      const heatData = [
        [39.4699, -0.3763, 0.5], // Ayuntamiento de Valencia
        [39.4738, -0.3774, 0.5], // Mercado Central de Valencia
        [39.4663, -0.3685, 0.5], // Mercado de Colón
        [39.4696, -0.3765, 0.5]  // Estación de metro Alameda de Valencia
        // Puedes agregar más datos si lo deseas...
    ];
    
  
      // Usa el método heatLayer directamente
      (L as any).heatLayer(heatData, { radius: 25 }).addTo(this.map);
    }
}
