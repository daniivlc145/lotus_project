import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { muestraMisIncidencias } from './mis-incidencias.functions';

@Component({
  selector: 'app-mis-incidencias',
  templateUrl: './mis-incidencias.component.html',
  styleUrls: ['./mis-incidencias.component.scss'],
})
export class MisIncidenciasComponent implements OnInit {
  @ViewChild('incidenciaElement') incidenciaElement!: ElementRef<HTMLElement>;
  elementos: {[clave:string]:string}[] = []; // Almacenar los resultados de muestraMisIncidencias
  protected margenInicial = 10; // Margen inicial
  protected incrementoMargen = 25; // Incremento de margen cada vez que se replica

  constructor(private router: Router) {}

  ngOnInit(): void {
    muestraMisIncidencias().then((result) => {
      this.elementos = result; // Almacenar los resultados
      console.log(result);
  
      // Replicar el elemento para cada incidencia después de que se resuelva muestraMisIncidencias()
      this.replicarElementos();
    });
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
  nuevoDiv.setAttribute ('style', 'right:50%; margin-bottom: 30px;');

  const nuevoLabel = document.createElement('div');
  nuevoLabel.setAttribute ('style', 'position:relative');
  nuevoDiv.appendChild(nuevoLabel);

  // Crear un nuevo elemento SVG
  const nuevoSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  nuevoSVG.setAttribute('id', 'backgroundSVG');
  nuevoSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  nuevoSVG.setAttribute('viewBox', '0.644079 3.88478 13.17 8.81');
  nuevoSVG.setAttribute('style', 'width:100%; position:relative; z-index: 1; filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.15)); align-self:center; align-content:center');
  nuevoSVG.setAttribute('x', '10');
  nuevoSVG.setAttribute('y', '20');
  // Crear el elemento 'path' dentro del elemento SVG
  const nuevoPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  nuevoPath.setAttribute('d', 'M 3.383 12.648 C 0.954 12.45 0.717 10.749 0.695 9.97 C 0.674 9.359 0.527 9.149 0.855 5.824 C 1.17 5.165 0.826 4.106 7.9 3.905 C 9.613 3.803 10.829 4.127 11.337 3.991 C 12.826 4.02 13.943 4.478 13.807 9.418 C 13.694 11.16 13.826 12.31 11.722 12.595 C 4.056 12.543 4.696 12.796 3.383 12.648');
  nuevoPath.setAttribute('fill', '#ffffff');

  // Agregar el elemento 'path' al elemento SVG
  nuevoSVG.appendChild(nuevoPath);

  // Agregar el nuevo elemento SVG al nuevo div
  nuevoDiv.appendChild(nuevoSVG);

  const svgHeader = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgHeader.setAttribute('id', 'svgHeader');
  svgHeader.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgHeader.setAttribute('viewBox', '0.763236 3.87435 13.06 3.126');
  svgHeader.setAttribute('style', 'height: 70%; width:90%; position:relative; z-index: 2;');

  // Crear el elemento 'path' dentro del elemento SVG
  const nuevoPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  nuevoPath2.setAttribute('d', 'M 0.793 7 C 0.723 7.016 0.79 5.827 0.855 5.824 C 1.25 4.642 0.826 4.106 7.9 3.905 C 9.613 3.803 10.824 3.988 11.337 3.991 C 12.826 4.02 13.859 4.776 13.819 6.99');
  nuevoPath2.setAttribute('fill', '#5a8d8d');

  // Agregar el elemento 'path' al elemento SVG
  nuevoSVG.appendChild(nuevoPath2);

  // Agregar el nuevo elemento SVG al nuevo div
  nuevoDiv.appendChild(nuevoSVG);
  // Crear elementos para cada dato y agregarlos al nuevo div
 
  const labelUbi = document.createElement('p');
  labelUbi.className = 'label-Ubi';
  labelUbi.textContent='Ubicación:';
  labelUbi.setAttribute('style',' font-size: 18px;  text-align: left;color: #3a5e62; position: absolute;z-index: 3;margin-top: 90px; left: 7%; ')
  nuevoLabel.appendChild(labelUbi);

  const labeldesc = document.createElement('p');
  labeldesc.className = 'label-desc';
  labeldesc.textContent='Descripción:';
  labeldesc.setAttribute('style',' font-size: 18px;  text-align: left;color: #3a5e62; position: absolute;z-index: 3; margin-top: 120px; left: 7%; ')
  nuevoLabel.appendChild(labeldesc);

  const fechaElement = document.createElement('p');
  fechaElement.className = 'texto-DATE';
  fechaElement.textContent = elem['fecha'];
  fechaElement.setAttribute('style',' font-size: 20px;  text-align: left;color: #ffffff; position: absolute;z-index: 3;margin-top: 40px; left: 50%; ')
  nuevoLabel.appendChild(fechaElement);

  const tipoElement = document.createElement('p');
  tipoElement.className = 'texto-TIPO';
  tipoElement.textContent = elem['type'];
  tipoElement.setAttribute('style',' font-size: 25px;  text-align: left;color: #ffffff; position: absolute;z-index: 3; margin-top: 40px; left: 7%;')
  nuevoLabel.appendChild(tipoElement);

  const horaElement = document.createElement('p');
  horaElement.className = 'texto-TIME';
  horaElement.textContent = elem['hora'];
  horaElement.setAttribute('style',' font-size: 20px;  text-align: left;color: #ffffff; position: absolute;z-index: 3; margin-top: 40px; left: 80%;')
  nuevoLabel.appendChild(horaElement);

  const descripcionElement = document.createElement('p');
  descripcionElement.className = 'texto-desc';
  descripcionElement.textContent = elem['descripcion'];
  descripcionElement.setAttribute('style',' font-size: 16px;  text-align: left;color: #b5b4b8; position: absolute;z-index: 3; margin-top: 120px; left:35%; overflow: hidden;text-overflow: ellipsis; width: 170px; white-space: nowrap;')
  nuevoLabel.appendChild(descripcionElement);
  

  const geoShapeElement = document.createElement('p');
  geoShapeElement.className = 'texto-Ubi';
  geoShapeElement.textContent = elem['geo_shape'];
  geoShapeElement.setAttribute('style',' font-size: 16px;  text-align: left;color: #b5b4b8; position: absolute;z-index: 3; margin-top: 90px; left:30%; overflow: hidden; text-overflow: ellipsis; width: 170px; white-space: nowrap; overflow-wrap: break-word;')
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
  <h2 style="text-align: center; font-family: Laura merged, sans-serif; font-size:5vw;"><strong>DETALLES DE LA INCIDENCIA</strong></h2>
  <p style="font-size:4vw;">Fecha: ${elem['fecha']}</p>
  <p style="font-size:4vw;">Tipo: ${elem['type']}</p>
  <p style="font-size:4vw;">Hora: ${elem['hora']}</p>
  <p style="font-size:4vw;">Descripción: ${elem['descripcion']}</p>
  <p style="font-size:4vw;">Ubicación: ${elem['geo_shape']}</p>
  ${elem['link_imagen'] ? `<div style="text-align:center;"><img src="${elem['link_imagen']}" width="100px" height="100px" style="margin: auto;" /></div>` : ''}
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







  goToInfoPage() {

    this.router.navigate(['/info-rec']);
  
  }

  goToNuevaIncPage() {

    this.router.navigate(['/newI']);
  }

  goToMisPage() {
    
    window.location.reload();

  }

  goToMapPage() {

    this.router.navigate(['/map']);
    
  }

  goToProfPage(){

    this.router.navigate(['/profUser']);

  }

}
