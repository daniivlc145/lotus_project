import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { searchContainers } from './map.functions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  customDiv: HTMLElement | null = null;
  map!: L.Map;
  markers: L.Marker[] = []; // Array para almacenar los marcadores
  customIcon!: L.Icon;
  


  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initializeMap();
    }, 500);
  }

  private initializeMap() {
    const vidrio = L.icon({
      iconUrl: '../../assets/img/Contenedor_Vidrio.png',
      iconSize: [30, 47],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    const aceite = L.icon({
      iconUrl: '../../assets/img/Contenedor_Aceite.png',
      iconSize: [30, 47],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    const envases = L.icon({
      iconUrl: '../../assets/img/Contenedor_Envases.png',
      iconSize: [30, 47],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    const organico = L.icon({
      iconUrl: '../../assets/img/Contenedor_Organico.png',
      iconSize: [30, 47],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    const papel = L.icon({
      iconUrl: '../../assets/img/Contenedor_Papel.png',
      iconSize: [30, 47],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    const residuos = L.icon({
      iconUrl: '../../assets/img/Contenedor_Residuos.png',
      iconSize: [30, 47],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    const ropa = L.icon({
      iconUrl: '../../assets/img/Contenedor_Ropa.png',
      iconSize: [30, 47],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    const diccionario_imagenes : {[clave:string] : L.Icon}= {
      "glass_containers"    : vidrio,
      "oil_containers"      : aceite,
      "clothes_containers"  : ropa,
      "Residuos Urbanos"    : residuos,
      "Papel / Carton"     : papel,
      "Envases Ligeros"    : envases,
      "Organico"            : organico
    }

    this.map = L.map('map', {
      zoomControl: false // Desactiva el control de zoom predeterminado
    }).setView([39.4697, -0.3774], 50);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Escucha el evento de cambio de vista del mapa
    this.map.on('moveend', () => {
      this.updateMarkers(); // Actualiza los marcadores cuando cambia la vista del mapa
    });

    const tipos_contenedor = [      
      "glass_containers",    
      "oil_containers",      
      "clothes_containers",  
      "Residuos Urbanos",    
      "Papel / Carton",      
      "Envases Ligeros",     
      "Organico"
    ]
    const container_info = searchContainers().then(
      (result)=> {
        for(let basura of tipos_contenedor){
          for(let basura_array of result[basura]){
             let coordenadas = basura_array.location
             let location = coordenadas.split(",").map(item => parseFloat(item))
             let tipo = diccionario_imagenes[basura]
             this.addMarker({lat: location[0], lng: location[1]},coordenadas,tipo)
          }

        }



      })


    // Agrega un marcador al mapa usando el icono personalizado

    this.addMarker({ lat: 39.4697, lng: -0.3774 }, '', vidrio);
  }

  // Función para agregar un marcador al mapa
  addMarker(latlng: L.LatLngLiteral, popupContent: string, icon: L.Icon) {
    const marker = L.marker(latlng, { icon: icon });
    this.markers.push(marker);
    marker.addTo(this.map);

    marker.on('click', (e) => {
      this.createCustomDiv(e.latlng, popupContent);
      this.mostrarDiv(); // Llama a la función para crear el div
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
        <p style="position:absolute; top:35%;"><strong>UBICACIÓN:${popupContent} </strong></p>
        <br>
        <button id="cerrarBtn" style='height: 21%; width: 30%; color: white; background-color: #c1d7d5; position: absolute; left: 15%; border-radius: 15px; font-size: 18px; text-align: center; line-height: 100%; bottom:13px;'>CERRAR</button>
        <button id="anadirBtn" style='height: 21%; width: 30%; background-color: #3a5e62; right: 15%; position: absolute; color: white; border-radius: 15px; font-size: 18px; text-align: center; line-height: 100%; bottom:13px;'>AÑADIR REPORTE</button>
        
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
    const anadirBtn = this.customDiv.querySelector('#anadirBtn');
    if (anadirBtn) {
      anadirBtn.addEventListener('click', () => {
        this.goToNuevaIncPage();
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
  selectedItems: string[] = [];
  
  items = [
    { id: 'glass_containers', selected: false },
    { id: 'oil_containers', selected: false },
    { id: 'clothes_containers', selected: false },
    { id: 'Residuos Urbanos', selected: false },
    { id: 'Papel / Carton', selected: false },
    { id: 'Envases Ligeros', selected: false },
    { id: 'Organico', selected: false },
  ];
  
  toggleAll() {
    this.selectAll = !this.selectAll;
    this.items.forEach(item => {
      item.selected = this.selectAll;
    });
    this.updateSelectedItems();
  }
  
  itemChanged(item: any) {
    if (this.selectAll && !item.selected) {
      // Si selectAll es true y un elemento se deselecciona,
      // desactiva la opción de seleccionar todos
      this.selectAll = false;
      // Desactiva el checkbox "checkbox-top-right"
      const checkbox = document.getElementById('checkbox-top-right') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
    } else if (!this.selectAll && this.items.every(item => item.selected)) {
      // Si selectAll es false y todos los elementos están seleccionados,
      // activa la opción de seleccionar todos
      this.selectAll = true;
      // Activa el checkbox "checkbox-top-right"
      const checkbox = document.getElementById('checkbox-top-right') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
      }
    }
    this.updateSelectedItems();
  }
  
  
  
  updateSelectedItems() {
    this.selectedItems = this.items
      .filter(item => item.selected)
      .map(item => item.id);
    console.log(this.selectedItems);


  }
  


  goToInfoPage() {
  
    this.router.navigate(['/info-rec']);
  }

  goToNuevaIncPage() {

    this.router.navigate(['/newI']);
  }

  goToMisPage() {

    this.router.navigate(['/misI']);
  }

  goToMapPage() {

      window.location.reload();
    
  }
}
