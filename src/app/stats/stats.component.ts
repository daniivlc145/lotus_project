import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmailService } from '../email.service';
import { getStatsCalles, getStatsContenedores } from './stats.functions';
import { getFullContainerStat, getReclamationStat, getSuggestionStat, getQueryStat } from './stats.functions';
import { ChangeDetectorRef } from '@angular/core';

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
  imageName = '../../icons/Blank_Chiquito.png'

  constructor(private router: Router,  private cdRef: ChangeDetectorRef, private emailService: EmailService) { }

  async ngOnInit() {
    await this.obtenerDatos(); // Asegúrate de que los datos estén disponibles antes de continuar
    let stats = await getStatsContenedores()
    this.imageName = await this.emailService.pedirStats(stats)
    console.log("HOLA")
    this.obtenerNumeroContenedoresLlenos();
    this.obtenerConsultas();
    this.obtenerReclamaciones();
    this.obtenerSugerencias();
  }
  

  
  


  async obtenerDatos() {
    const result = await getStatsCalles();
    this.elementos = result;
    this.incidenciasData = Object.keys(this.elementos).map(calle => ({
      calle,
      porcentaje: this.elementos[calle]
    }));
  
    // Ordenar las incidencias por porcentaje
    this.incidenciasData.sort((a, b) => b.porcentaje - a.porcentaje);
  
    console.log(this.incidenciasData);
    this.cdRef.detectChanges(); // Forzar a Angular a detectar cambios
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

