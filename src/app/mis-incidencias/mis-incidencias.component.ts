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
        if (this.elementos) {
            this.elementos.forEach(elem => this.crearNuevoElemento(elem)); // Crear un nuevo elemento para cada incidencia
        }
    });
}

private crearNuevoElemento(elem: {[clave:string]:string}): void {
    // Crear un nuevo elemento div
    const nuevoElemento = document.createElement('div');
    nuevoElemento.className = 'nuevo-incidencia-elemento'; // Asignar una clase para estilos CSS
    
    // Crear elementos para cada dato y agregarlos al nuevo elemento
    const fechaElement = document.createElement('div');
    fechaElement.className = 'texto-DATE';
    fechaElement.textContent = elem['fecha'];
    nuevoElemento.appendChild(fechaElement);

    // Repetir este proceso para los demás datos (hora, descripción, tipo, etc.)

    // Agregar el nuevo elemento al DOM
    const contenedor = document.getElementById('contenedor-incidencias'); // Supongamos que hay un div contenedor con id "contenedor-incidencias"
    if (contenedor) {
        contenedor.appendChild(nuevoElemento);
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
