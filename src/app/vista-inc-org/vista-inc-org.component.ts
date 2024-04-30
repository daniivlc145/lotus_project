import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import { muestraMisIncidencias } from './mis-incidencias.functions';

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
   /* muestraMisIncidencias().then((result) => {
      this.elementos = result; // Almacenar los resultados
      console.log(result);
  
      // Replicar el elemento para cada incidencia después de que se resuelva muestraMisIncidencias()
      this.replicarElementos();
    });*/
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
