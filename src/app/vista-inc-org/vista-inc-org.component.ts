import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getAllInquiries, filtraInquiriesTipo } from './vista-inc-org.functions';

@Component({
  selector: 'app-vista-inc-org',
  templateUrl: './vista-inc-org.component.html',
  styleUrls: ['./vista-inc-org.component.scss'],
})
export class VistaIncOrgComponent  implements OnInit {

  @ViewChild('incidenciaElement') incidenciaElement!: ElementRef<HTMLElement>;
  elementos: {[clave:string]:string}[] = []; // Almacenar los resultados de muestraMisIncidencias
  protected margenInicial = 10; // Margen inicial
  protected incrementoMargen = 25; // Incremento de margen cada vez que se replica

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }



  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

 
  
  

  replicarElementos(): void {
    setTimeout(() => {
        const contenedor = document.getElementById('contenedorIncidencias');
        if (contenedor) {
            // Vaciar el contenido del contenedor
            contenedor.innerHTML = '';

            if (this.elementos) {
                this.elementos.forEach(elem => this.crearNuevoElemento(elem)); // Crear un nuevo elemento para cada incidencia
            }
        } else {
            console.error('Contenedor de incidencias no encontrado en el DOM.');
        }
    });
}


private crearNuevoElemento(elem: {[clave:string]:string}): void {
  // Crear un nuevo elemento div
  const nuevoDiv = document.createElement('div');
  nuevoDiv.setAttribute ('style', 'right:50%;');

  const nuevoLabel = document.createElement('div');
  nuevoLabel.setAttribute ('style', 'position:relative');
  nuevoDiv.appendChild(nuevoLabel);

  // Crear un nuevo elemento SVG
  const nuevoSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  nuevoSVG.setAttribute('id', 'backgroundSVG');
  nuevoSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  nuevoSVG.setAttribute('viewBox', '1.55556 0.75 10.56 5.694');
  nuevoSVG.setAttribute('style', 'width:300px; position:relative; z-index: 1; filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.15)); align-self:center; align-content:center');
  nuevoSVG.setAttribute('x', '10');
  nuevoSVG.setAttribute('y', '20');
  // Crear el elemento 'path' dentro del elemento SVG
  const nuevoPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  nuevoPath.setAttribute('d', 'M 3 6 C 3 6 2 6 2 5 C 2 5 1 3 2 2 C 4 0 5 1 9 1 C 13 1 12 3 12 3 C 12 4 11 6 10 6 C 7 7 6 6 3 6');
  nuevoPath.setAttribute('fill', '#ffffff');

  // Agregar el elemento 'path' al elemento SVG
  nuevoSVG.appendChild(nuevoPath);

  // Agregar el nuevo elemento SVG al nuevo div
  nuevoDiv.appendChild(nuevoSVG);

  const svgHeader = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgHeader.setAttribute('id', 'svgHeader');
  svgHeader.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgHeader.setAttribute('viewBox', '1 0.75 11.11 2.25');
  svgHeader.setAttribute('style', 'height: 140px; width:315px; position:relative; z-index: 2;');

  // Crear el elemento 'path' dentro del elemento SVG
  const nuevoPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  nuevoPath2.setAttribute('d', 'M 1 3 C 2 3 1 3 2 2 C 4 0 5 1 9 1 C 13 1 12 3 12 3 C 6 3 7 3 3 3');
  nuevoPath2.setAttribute('fill', '#5a8d8d');

  // Agregar el elemento 'path' al elemento SVG
  nuevoSVG.appendChild(nuevoPath2);

  // Agregar el nuevo elemento SVG al nuevo div
  nuevoDiv.appendChild(nuevoSVG);
  // Crear elementos para cada dato y agregarlos al nuevo div
 
  const labelUbi = document.createElement('p');
  labelUbi.className = 'label-Ubi';
  labelUbi.textContent='Ubicación:';
  labelUbi.setAttribute('style',' font-size: 16px;  text-align: left;color: #3a5e62; position: absolute;z-index: 3;margin-top: 70px; left: 7%; ')
  nuevoLabel.appendChild(labelUbi);

  const labeldesc = document.createElement('p');
  labeldesc.className = 'label-desc';
  labeldesc.textContent='Descripción:';
  labeldesc.setAttribute('style',' font-size: 16px;  text-align: left;color: #3a5e62; position: absolute;z-index: 3; margin-top: 100px; left: 7%; ')
  nuevoLabel.appendChild(labeldesc);

  const fechaElement = document.createElement('p');
  fechaElement.className = 'texto-DATE';
  fechaElement.textContent = elem['fecha'];
  fechaElement.setAttribute('style',' font-size: 20px;  text-align: left;color: #ffffff; position: absolute;z-index: 3;margin-top: 40px; left: 47%; ')
  nuevoLabel.appendChild(fechaElement);

  const tipoElement = document.createElement('p');
  tipoElement.className = 'texto-TIPO';
  tipoElement.textContent = elem['type'];
  tipoElement.setAttribute('style',' font-size: 25px;  text-align: left;color: #ffffff; position: absolute;z-index: 3; margin-top: 40px; left: 5%;')
  nuevoLabel.appendChild(tipoElement);

  const horaElement = document.createElement('p');
  horaElement.className = 'texto-TIME';
  horaElement.textContent = elem['hora'];
  horaElement.setAttribute('style',' font-size: 20px;  text-align: left;color: #ffffff; position: absolute;z-index: 3; margin-top: 40px; left: 70%;')
  nuevoLabel.appendChild(horaElement);

  const descripcionElement = document.createElement('p');
  descripcionElement.className = 'texto-desc';
  descripcionElement.textContent = elem['descripcion'];
  descripcionElement.setAttribute('style',' font-size: 14px;  text-align: left;color: #b5b4b8; position: absolute;z-index: 3; margin-top: 100px; left:28%; overflow: hidden;text-overflow: ellipsis; width: 170px; white-space: nowrap;')
  nuevoLabel.appendChild(descripcionElement);
  

  const geoShapeElement = document.createElement('p');
  geoShapeElement.className = 'texto-Ubi';
  geoShapeElement.textContent = elem['geo_shape'];
  geoShapeElement.setAttribute('style',' font-size: 14px;  text-align: left;color: #b5b4b8; position: absolute;z-index: 3; margin-top: 70px; left:28%; overflow: hidden; text-overflow: ellipsis; width: 170px; white-space: nowrap; overflow-wrap: break-word;')
  nuevoLabel.appendChild(geoShapeElement);

  // Obtener el contenedor de incidencias
  const contenedor = document.getElementById('contenedorIncidencias');
  if (contenedor) {
      // Agregar el nuevo div al contenedor de incidencias
      contenedor.appendChild(nuevoDiv);
  } else {
      console.error('Contenedor de incidencias no encontrado en el DOM.');
  }




  nuevoDiv.setAttribute('style', 'right:50%; cursor: pointer;'); // Agrega estilo para indicar que es clickeable

  // Agregar un manejador de eventos clic
  nuevoDiv.addEventListener('click', () => {
    // Al hacer clic, mostrar información detallada del elemento
    this.mostrarDetalle(elem);
  });

}

mostrarDetalle(elem: {[clave:string]:string}): void {
  // Crear un div para mostrar la información detallada
  const detalleDiv = document.createElement('div');
  detalleDiv.setAttribute('id', 'detalleIncidencia');
  // Definir estilos CSS para el div principal
const divStyles = `
font-family: Laura merged, sans-serif;
color: #3a5e62;
padding: 5%;
height: 60%;
width: 60%;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="1.55556 -0.584459 16.44 26.33" style="height: 100%; width: 100%;  position: absolute;"><path d="M 17 25 C 17 26 3 26 3 25 C 2 24 2 24 2 13 C 2 7 1 1 2 1 C 3 0 15 -2 17 1 C 18 2 18 14 18 14 C 18 21 18 24 17 25" fill="%23FFFFFF"/></svg>');
background-color: white;
border: 2px solid #ccc;
z-index: 9999;
background-repeat: no-repeat;
background-color: transparent;
border:none;
`;

// Agregar estilos al div principal
detalleDiv.setAttribute('style', divStyles);

// Agregar la información detallada al div
detalleDiv.innerHTML = `
<div style='height:13%; width:13%; z-index:123; position: absolute; top:7%; right:15%;'><img id="cerrarDetalle" src="../assets/img/X.png" alt="Cerrar" style="cursor: pointer;"></div>
<div style='z-index:12; position: absolute; top:18%; left: 50%; transform: translateX(-50%); width: 80%;'>
  <h2 style="text-align: center; font-family: Laura merged, sans-serif; font-size:130%;"><strong>DETALLES DE LA INCIDENCIA</strong></h2>
  <p>Fecha: ${elem['fecha']}</p>
  <p>Tipo: ${elem['type']}</p>
  <p>Hora: ${elem['hora']}</p>
  <p>Descripción: ${elem['descripcion']}</p>
  <p>Ubicación: ${elem['geo_shape']}</p>
</div>
`;


  // Agregar el div al body del documento
  document.body.appendChild(detalleDiv);

  // Crear un div para cubrir el fondo y deshabilitar los demás elementos
  const fondoDiv = document.createElement('div');
  fondoDiv.setAttribute('id', 'fondoInhabilitado');
  fondoDiv.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 9998;');

  // Agregar el div de fondo al body del documento
  document.body.appendChild(fondoDiv);

  // Agregar un manejador de eventos clic al botón de cerrar
  const cerrarBoton = detalleDiv.querySelector('#cerrarDetalle');
  if (cerrarBoton) {
    cerrarBoton.addEventListener('click', () => {
      detalleDiv.remove(); // Eliminar el div de detalle
      fondoDiv.remove(); // Eliminar el div de fondo
    });
  }
}





goToIncPage() {

  window.location.reload();
}

goToMapPage() {

   
  this.router.navigate(['/mapCalor']); 
}

goToProfPage(){

  this.router.navigate(['/profOrg']);

}

goToStatsPage(){
  this.router.navigate(['/stats']);
}

selectAll: boolean = true;
items = [
    { id: 'RECLAMACIÓN', selected: true },
    { id: 'PETICIÓN', selected: true },
    { id: 'CONSULTA', selected: true },
    { id: 'CONTENEDOR LLENO', selected: true },
];

itemChanged() {
  // Verificar si todos los checkboxes están marcados
  if (this.items.every(item => item.selected)) {
    this.selectAll = true;
  } else {
    this.selectAll = false;
  }
  // Cargar datos según el estado de los checkboxes
  this.loadData();
}

toggleAll() {
  // Cambiar el estado de todos los checkboxes
  this.items.forEach(item => item.selected = this.selectAll);
  // Cargar datos según el estado de los checkboxes
  this.loadData();
}

loadData(): void {
  // Lógica para cargar los datos según el estado de los checkboxes
  if (this.selectAll) {
    getAllInquiries().then((result) => {
      this.elementos = result; // Almacenar los resultados
      this.replicarElementos();
    });
  } else {
    const tiposSeleccionados = this.items.filter(item => item.selected).map(item => item.id);
    filtraInquiriesTipo(tiposSeleccionados).then((result) => {
      this.elementos = result; // Almacenar los resultados
      this.replicarElementos();
    });
  }
}

}
