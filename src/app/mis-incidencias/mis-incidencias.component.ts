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
  nuevoSVG.setAttribute('style', 'width:300px; position:relative; z-index: 1; filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.15)); align-self:center; align-content:center');
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
  svgHeader.setAttribute('style', 'height: 140px; width:315px; position:relative; z-index: 2;');

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
  fechaElement.setAttribute('style',' font-size: 20px;  text-align: left;color: #ffffff; position: absolute;z-index: 3;margin-top: 40px; left: 46%; ')
  nuevoLabel.appendChild(fechaElement);

  const tipoElement = document.createElement('p');
  tipoElement.className = 'texto-TIPO';
  tipoElement.textContent = elem['type'];
  tipoElement.setAttribute('style',' font-size: 25px;  text-align: left;color: #ffffff; position: absolute;z-index: 3; margin-top: 40px; left: 7%;')
  nuevoLabel.appendChild(tipoElement);

  const horaElement = document.createElement('p');
  horaElement.className = 'texto-TIME';
  horaElement.textContent = elem['hora'];
  horaElement.setAttribute('style',' font-size: 20px;  text-align: left;color: #ffffff; position: absolute;z-index: 3; margin-top: 40px; left: 68%;')
  nuevoLabel.appendChild(horaElement);

  const descripcionElement = document.createElement('p');
  descripcionElement.className = 'texto-desc';
  descripcionElement.textContent = elem['descripcion'];
  descripcionElement.setAttribute('style',' font-size: 16px;  text-align: left;color: #b5b4b8; position: absolute;z-index: 3; margin-top: 120px; left:29%; overflow: hidden;text-overflow: ellipsis; width: 170px; white-space: nowrap;')
  nuevoLabel.appendChild(descripcionElement);
  

  const geoShapeElement = document.createElement('p');
  geoShapeElement.className = 'texto-Ubi';
  geoShapeElement.textContent = elem['geo_shape'];
  geoShapeElement.setAttribute('style',' font-size: 16px;  text-align: left;color: #b5b4b8; position: absolute;z-index: 3; margin-top: 90px; left:29%; overflow: hidden; text-overflow: ellipsis; width: 170px; white-space: nowrap; overflow-wrap: break-word;')
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
