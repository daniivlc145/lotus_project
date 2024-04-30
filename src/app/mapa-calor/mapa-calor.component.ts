import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { Router } from '@angular/router';
import {getFullContainers} from './mapa-calor.functions';

// Importa heatLayer específicamente desde el paquete de Leaflet-Heat
import 'leaflet.heat/dist/leaflet-heat';

@Component({
  selector: 'app-mapa-calor',
  templateUrl: './mapa-calor.component.html',
  styleUrls: ['./mapa-calor.component.scss'],
})
export class mapaCalorComponent implements OnInit {

    map!: L.Map;

    constructor(private router: Router) { }
  
    ngOnInit(): void {

        setTimeout(() => {
            this.initMap();
          }, 500);
      
    }
  
    private async initMap(): Promise<void> {
        this.map = L.map('map', {
            zoomControl: false // Desactiva el control de zoom predeterminado
          }).setView([39.4697, -0.3774], 50);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
  
      // Ejemplo de datos para el mapa de calor
      const heatData = await getFullContainers();
      console.log(heatData);
  
      // Usa el método heatLayer directamente
      (L as any).heatLayer(heatData, { radius: 25 }).addTo(this.map);
    }


    goToIncPage() {

      this.router.navigate(['/']);
    }
  
    goToMapPage() {
  
        window.location.reload();
      
    }
  
    goToProfPage(){
  
      this.router.navigate(['/profOrg']);
  
    }
  
    goToStatsPage(){
      this.router.navigate(['/stats']);
    }
  }
