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
        this.elementos.forEach(elem => this.replicarElemento(elem)); // Replicar el elemento para cada incidencia
        console.log(this.elementos);
      }
    });
  }
  

  private replicarElemento(elem: {[clave:string]:string}): void {
    // Verificar si incidenciaElement está definido antes de usarlo
    if (!this.incidenciaElement) {
      console.error('Elemento de incidencia no encontrado.');
      return;
    }
  
    // Clonar el elemento original
    const elementoOriginal = this.incidenciaElement.nativeElement;
    const nuevoElemento = elementoOriginal.cloneNode(true) as HTMLElement;
  
    // Calcular el nuevo margen
    const margen = this.margenInicial + this.incrementoMargen;
  
    // Aplicar el nuevo margen al nuevo elemento clonado
    nuevoElemento.style.marginTop = `${margen}px`;
  
    // Actualizar los labels correspondientes a la fecha, hora, descripción, type y geo-shape
    const fechaElement = nuevoElemento.querySelector('.texto-DATE')!;
    const horaElement = nuevoElemento.querySelector('.texto-TIME')!;
    const descripcionElement = nuevoElemento.querySelector('.texto-desc')!;
    const tipoElement = nuevoElemento.querySelector('.texto-TIPO')!;
    const geoShapeElement = nuevoElemento.querySelector('.texto-geo-shape')!;
  
    fechaElement.textContent = elem['fecha'];
    horaElement.textContent = elem['hora'];
    descripcionElement.textContent = elem['descripcion'];
    tipoElement.textContent = elem['type'];
    geoShapeElement.textContent = elem['geo_shape'];
  
    // Agregar el nuevo elemento clonado al DOM
    elementoOriginal.parentElement?.appendChild(nuevoElemento);
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
