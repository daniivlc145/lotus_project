import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getStatsCalles } from './stats.functions';
import { getFullContainerStat, getReclamationStat, getSuggestionStat, getQueryStat } from './stats.functions';

interface Incidencia {
  calle: string;
  porcentaje: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  elementos: {[clave:string]:number} = {}; // Almacenar los resultados de muestraMisIncidencias
  incidenciasData: Incidencia[] = [];

  constructor(private router: Router) { }

  async ngOnInit() {
    await this.obtenerDatos(); // Asegúrate de que los datos estén disponibles antes de continuar
    this.obtenerNumeroContenedoresLlenos();
    this.obtenerConsultas();
    this.obtenerReclamaciones();
    this.obtenerSugerencias();
  }

  async obtenerDatos() {
    const result = await getStatsCalles();
    this.elementos = result; // Almacenar los resultados
    this.incidenciasData = Object.keys(this.elementos).map(calle => ({
      calle,
      porcentaje: this.elementos[calle]
    }));
    console.log(result);  
  }


 


async  obtenerNumeroContenedoresLlenos() {
    try {
      const numero = await getFullContainerStat();
      var elemento = document.getElementById("2");
  
      if (elemento) {
        console.log(numero)
        elemento.textContent = numero.toString(); 
      } 
    } catch (error) {
      console.error("Error al obtener el número:", error);
    }
  }

  async  obtenerConsultas() {
    try {
      const numero = await getQueryStat();
      var elemento = document.getElementById("4");
  
      if (elemento) {
        elemento.textContent = numero.toString();
      } 
    } catch (error) {
      console.error("Error al obtener el número:", error);
    }
  }

  async  obtenerReclamaciones() {
    try {
      const numero = await getReclamationStat();
      var elemento = document.getElementById("3");
  
      if (elemento) {
        elemento.textContent = numero.toString(); 
      }
    } catch (error) {
      console.error("Error al obtener el número:", error);
    }
  }
  
  async  obtenerSugerencias() {
    try {
      const numero = await getSuggestionStat();
      var elemento = document.getElementById("1");
  
      if (elemento) {
        elemento.textContent = numero.toString();
      }
    } catch (error) {
      console.error("Error al obtener el número:", error);
    }
  }


  goToIncPage() {

    this.router.navigate(['/incOrg']);
  }

  goToMapPage() {

     
    this.router.navigate(['/mapCalor']); 
  }

  goToProfPage(){

    this.router.navigate(['/profOrg']);

  }

  goToStatsPage(){
    window.location.reload();
  }

}

