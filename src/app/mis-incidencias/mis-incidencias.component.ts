import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-incidencias',
  templateUrl: './mis-incidencias.component.html',
  styleUrls: ['./mis-incidencias.component.scss'],
})
export class MisIncidenciasComponent implements OnInit, AfterViewInit {
  @ViewChild('incidenciaElement') incidenciaElement!: ElementRef<HTMLElement>;
  elementos: number[] = [1, 2, 3];
  private margenInicial = 10; // Margen inicial
  private incrementoMargen = 25; // Incremento de margen cada vez que se replica

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.replicarElemento();
  }

  private replicarElemento(): void {
    // Clonar el elemento original
    const elementoOriginal = this.incidenciaElement.nativeElement;
    const nuevoElemento = elementoOriginal.cloneNode(true) as HTMLElement;

    // Calcular el nuevo margen
    const margen = this.margenInicial + this.incrementoMargen;

    // Aplicar el nuevo margen al nuevo elemento clonado
    nuevoElemento.style.marginTop = `${margen}px`;

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
