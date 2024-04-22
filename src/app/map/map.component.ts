import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  customDiv: HTMLElement | null = null; 
  constructor(private router: Router) { }

  map!: L.Map;
  markers: L.Marker[] = []; // Array para almacenar los marcadores
  customIcon!: L.Icon;


  ngAfterViewInit(): void {
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
    this.addMarker({ lat: 39.4697, lng: -0.3774 }, '' , customIcon);

  }

  // Función para agregar un marcador al mapa
  addMarker(latlng: L.LatLngLiteral, popupContent: string, icon: L.Icon) {
    const marker = L.marker(latlng, { icon: icon });
    this.markers.push(marker);
    marker.addTo(this.map);

    marker.on('click', (e) => {
      this.createCustomDiv(e.latlng, popupContent );
      this.mostrarDiv() // Llama a la función para crear el div
    });

  }

  createCustomDiv(latlng: L.LatLng, popupContent: string) {
    if (this.customDiv) {
        this.customDiv.remove();
    }

    // Creamos un nuevo div
    this.customDiv = document.createElement('div');
    this.customDiv.innerHTML = `
        <div style="color: #3a5e62; font-size: 16px; bottom: 20%;">
            <h1 id='con' style='font-family: "Laura Regular", sans-serif; color:#3a5e62;'>
                <strong>CONTENEDOR SELECCIONADO</strong>
            </h1>
            <p><strong>UBICACIÓN:${popupContent} </strong></p>
            <button id="cerrarBtn" style='height:15%; width: 20%; color:white; background-color:#c1d7d5;'>CERRAR</button>
            <button style='height:15%; width: 20%;  background-color: #3a5e62; right: 0px; position: absolute; color:white;' onclick="this.parentElement.remove()">AÑADIR REPORTE</button>
        </div>
    `;

    // Encuentra el contenedor en el HTML
    const container = document.getElementById('customDivContainer');

    // Agrega el div al contenedor
    if (container) {
        container.appendChild(this.customDiv);
    }

    // Asigna el evento onclick al botón CERRAR
    const cerrarBtn = this.customDiv.querySelector('#cerrarBtn');
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', () => {
            this.ocultarDiv();
            this.customDiv?.remove();
        });
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


   mostrarDiv() {
    const customDivContainer = document.getElementById("customDivContainer");
    if (customDivContainer) {
        customDivContainer.style.display = "block";
    }
}

  ocultarDiv() {
    const customDivContainer = document.getElementById("customDivContainer");
    if (customDivContainer) {
        customDivContainer.style.display = "none";
    }
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
  goToInfoPage() {
    console.log('goToLoginPage() called');
    this.router.navigate(['/info-rec']); 
  }
}
