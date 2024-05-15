import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { Router } from '@angular/router';
import {getFullContainers} from './mapa-calor.functions';
import 'leaflet-routing-machine';

// Importa heatLayer específicamente desde el paquete de Leaflet-Heat
import 'leaflet.heat/dist/leaflet-heat';
import { NONE_TYPE } from '@angular/compiler';

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

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri'
        }).addTo(this.map);
  
      // Ejemplo de datos para el mapa de calor
      const heatData = await getFullContainers();
      console.log(heatData);
      
      // Usa el método heatLayer directamente
      (L as any).heatLayer(heatData, { radius: 25 }).addTo(this.map);

      let routePoints : L.LatLng[] = []
      heatData.forEach(data => {
        // Suponiendo que data es un array que contiene las coordenadas [latitud, longitud]
        // Suponiendo que deseas eliminar el último elemento de data usando pop, aunque parece un error de sintaxis
        data.pop(); // No olvides los paréntesis para llamar a la función
    
        // Añadir las coordenadas como LatLng a routePoints
        routePoints.push(L.latLng(data[0], data[1]));
    });
    
   
    
    // Añadir la ruta con los marcadores personalizados como waypoints
    L.Routing.control({
        waypoints: routePoints,
    }).addTo(this.map);


      

      // Selecciona el div que deseas eliminar
// Selecciona el div que deseas eliminar
var divARemover = document.querySelector('.leaflet-routing-container');

// Verifica si el div existe y tiene un padre antes de intentar eliminarlo
if (divARemover && divARemover.parentNode) {
    // Elimina el div del DOM
    divARemover.parentNode.removeChild(divARemover);
} else {
    console.log('El elemento no fue encontrado o no tiene un padre.');
}




      
    }
    

    goToIncPage() {

      this.router.navigate(['/incOrg']);
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
