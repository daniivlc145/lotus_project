import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { filtrarMapa, searchContainers, filtrarMapaVacios } from './map.functions';
import { MediatorService } from '../mediator.service';
import { conversionWasteContainers } from '../nueva-incidencia/nueva-incidencia.functions';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  ubicacion:any;
  public coords:string='';
  customDiv: HTMLElement | null = null;
  map!: L.Map;
  markers: L.Marker[] = []; // Array para almacenar los marcadores
  customIcon!: L.Icon;

  vidrio = L.icon({
    iconUrl: '../../assets/img/Contenedor_Vidrio.png',
    iconSize: [30, 47],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
    className : "glass_containers"
  });

  aceite = L.icon({
    iconUrl: '../../assets/img/Contenedor_Aceite.png',
    iconSize: [30, 47],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
    className : "oil_containers"
  });

  envases = L.icon({
    iconUrl: '../../assets/img/Contenedor_Envases.png',
    iconSize: [30, 47],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
    className : "Envases Ligeros"
  });

  organico = L.icon({
    iconUrl: '../../assets/img/Contenedor_Organico.png',
    iconSize: [30, 47],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
    className : "Organico"
  });

  papel = L.icon({
    iconUrl: '../../assets/img/Contenedor_Papel.png',
    iconSize: [30, 47],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
    className : "Papel / Carton"
  });

  residuos = L.icon({
    iconUrl: '../../assets/img/Contenedor_Residuos.png',
    iconSize: [30, 47],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
    className : "Residuos Urbanos"

  });

  ropa = L.icon({
    iconUrl: '../../assets/img/Contenedor_Ropa.png',
    iconSize: [30, 47],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
    className : "clothes_containers"
  });
  
  diccionario_imagenes : {[clave:string] : L.Icon}= {
    "glass_containers"    : this.vidrio,
    "oil_containers"      : this.aceite,
    "clothes_containers"  : this.ropa,
    "Residuos Urbanos"    : this.residuos,
    "Papel / Carton"      : this.papel,
    "Envases Ligeros"     : this.envases,
    "Organico"            : this.organico
  }

  tipos_contenedor = [      
    "glass_containers",    
    "oil_containers",      
    "clothes_containers",  
    "Residuos Urbanos",    
    "Papel / Carton",      
    "Envases Ligeros",     
    "Organico"
  ]




  constructor(private router: Router, private mediatorService:MediatorService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.obtenerUbicacion();
    }, 500);
    const checkbox = document.getElementById('checkbox-top-right') as HTMLInputElement;
    checkbox.checked = true;
    const checkbox_empty = document.getElementById('checkbox-top-center') as HTMLInputElement;
    checkbox_empty.checked = true;
    
  }

  async obtenerUbicacion() {
    try {
      const ubicacion = await Geolocation.getCurrentPosition();
      console.log(ubicacion);
      this.ubicacion = ubicacion;
      this.initializeMap();
    } catch (error) {
      console.error('Error obteniendo la ubicación', error);
      // Si no se puede obtener la ubicación, establecer el punto inicial en el Ayuntamiento de Valencia
      this.ubicacion = { coords: { latitude: 39.4699, longitude: -0.3763 } }; // Coordenadas del Ayuntamiento de Valencia
      this.initializeMap();
    }
  }
  


  private async initializeMap() {

    const initialCoords = this.ubicacion ? [this.ubicacion.coords.latitude, this.ubicacion.coords.longitude] : [39.4699, -0.3763]; // Coordenadas del Ayuntamiento de Valencia
  
    // Convertir las coordenadas en un formato adecuado
    const initialLatLng: L.LatLngTuple = [initialCoords[0], initialCoords[1]];
  
    // Inicializar el mapa con la ubicación inicial
    this.map = L.map('map', {
      zoomControl: false // Desactiva el control de zoom predeterminado
    }).setView(initialLatLng, 30);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri'
    }).addTo(this.map);
    
    // Escucha el evento de cambio de vista del mapa
    this.map.on('moveend', () => {
      this.updateMarkers(); // Actualiza los marcadores cuando cambia la vista del mapa
    });

  
    // Agrega marcadores marcador al mapa usando el icono personalizado
    const container_info = searchContainers().then(
      (result)=> {
        for(let basura of this.tipos_contenedor){
          for(let basura_array of result[basura]){
             let coordenadas = basura_array.location
             let location = coordenadas.split(",").map(item => parseFloat(item))
             let tipo = this.diccionario_imagenes[basura]
             this.addMarker({lat: location[0], lng: location[1]},coordenadas,tipo, basura_array.container_id)
          }

        }


        this.updateSelectedItems();
      })
    

  }

  // Función para agregar un marcador al mapa
  addMarker(latlng: L.LatLngLiteral, popupContent: string, icon: L.Icon, containerId : number) {
    const marker = L.marker(latlng, { icon: icon, alt : String(containerId)});
    this.markers.push(marker);
    marker.addTo(this.map);

    marker.on('click', (e) => {
      this.createCustomDiv(e.latlng, popupContent, conversionWasteContainers(icon.options.className || "") , containerId);
      this.mostrarDiv(); // Llama a la función para crear el div
    });
  }

  createCustomDiv(latlng: L.LatLng, popupContent: string, type : string, containerId : number) {
    if (this.customDiv) {
      this.customDiv.remove();
    }
    this.mediatorService.coords = popupContent //se lo pasamos al mediador para pasarlo al nueva-incidencia-map.component
    this.mediatorService.markerContainerType = type //se lo pasamos al mediador para pasarlo al nueva-incidencia-map.component
    this.mediatorService.markerContainerID= containerId; //se lo pasamos al mediador para pasarlo al nueva-incidencia-map.component
    // Creamos un nuevo div
    this.customDiv = document.createElement('div');
    this.customDiv.innerHTML = `
      <div style="color: #3a5e62; font-size: 16px; bottom: 20%;">
        <h1 id='con' style='font-family: "Laura Regular", sans-serif; color:#3a5e62;'>
          <strong>CONTENEDOR SELECCIONADO</strong>
        </h1>
        <p style="position:absolute; top:35%;"><strong>UBICACIÓN: <span style="font-family: 'Laura merged', sans-serif; letter-spacing: 2px;">${popupContent}</span>
        </strong></p>
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
        this.goToNuevaIncMAPPage();
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

  selectAll = true;
  selectedItems: string[] = [];
  selectEmpty = true;
  
  items = [
    { id: 'glass_containers', selected: true },
    { id: 'oil_containers', selected: true },
    { id: 'clothes_containers', selected: true },
    { id: 'Residuos Urbanos', selected: true },
    { id: 'Papel / Carton', selected: true },
    { id: 'Envases Ligeros', selected: true },
    { id: 'Organico', selected: true },
  ];
  
  toggleAll() {
    this.selectAll = !this.selectAll;
    this.items.forEach(item => {
      item.selected = this.selectAll;
    });
    this.updateSelectedItems();
  }

  toggleNoLlenos() {
    this.selectEmpty= !this.selectEmpty;
    this.updateSelectedItems();
    
  }

  toggleCheckbox(itemId: string) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
        item.selected = !item.selected;
        this.itemChanged(item);
    }

    let containerName: string;
    switch (itemId) {
        case 'glass_containers':
            containerName = 'Vidrio';
            break;
        case 'oil_containers':
            containerName = 'Aceite';
            break;
        case 'clothes_containers':
            containerName = 'Ropa';
            break;
        case 'Residuos Urbanos':
            containerName = 'Residuos';
            break;
        case 'Papel / Carton':
            containerName = 'Papel';
            break;
        case 'Envases Ligeros':
            containerName = 'Envases';
            break;
        case 'Organico':
            containerName = 'Organico';
            break;
        default:
            // Si el itemId no coincide con ninguno de los nombres de contenedor conocidos, se deja igual
            containerName = itemId;
            break;
    }
    const imageName = this.getContainerImage(containerName);
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
   
    
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
    
    const container_info = filtrarMapa(this.selectedItems,this.selectEmpty).then(
      (result)=> {
       
        for(let basura of this.selectedItems){
          for(let basura_array of result[basura]){
             let coordenadas = basura_array.location
             let location = coordenadas.split(",").map(item => parseFloat(item))
             let tipo = this.diccionario_imagenes[basura]
             this.addMarker({lat: location[0], lng: location[1]},coordenadas,tipo, basura_array.container_id)
          }

        }
      })
  }
  
 
  getContainerImage(containerId: string): string {
    switch (containerId) {
      case 'glass_containers':
        return this.items[0].selected ? '../../assets/img/Contenedor_Vidrio_White.png' : '../../assets/img/Contenedor_Vidrio.png';
      case 'oil_containers':
        return this.items[1].selected ? '../../assets/img/Contenedor_Aceite_White.png' : '../../assets/img/Contenedor_Aceite.png';
      case 'clothes_containers':
        return this.items[2].selected ? '../../assets/img/Contenedor_Ropa_White.png' : '../../assets/img/Contenedor_Ropa.png';
      case 'Residuos Urbanos':
        return this.items[3].selected ? '../../assets/img/Contenedor_Residuos_White.png' : '../../assets/img/Contenedor_Residuos.png';
      case 'Papel / Carton':
        return this.items[4].selected ? '../../assets/img/Contenedor_Papel_White.png' : '../../assets/img/Contenedor_Papel.png';
      case 'Envases Ligeros':
        return this.items[5].selected ? '../../assets/img/Contenedor_Envases_White.png' : '../../assets/img/Contenedor_Envases.png';
      case 'Organico':
        return this.items[6].selected ? '../../assets/img/Contenedor_Organico_White.png' : '../../assets/img/Contenedor_Organico.png';
      default:
        return '';
    }
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

  goToProfPage(){

    this.router.navigate(['/profUser']);

  }

  goToNuevaIncMAPPage(){
    this.router.navigate(['/newImap']);
  }
}
function obtenerUbicacion() {
  throw new Error('Function not implemented.');
}

