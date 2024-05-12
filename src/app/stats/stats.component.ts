import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { getStats } from './stats.functions';
import { getFullContainerStat, getReclamationStat, getPetitionStat, getQueryStat } from './stats.functions';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent  implements OnInit {


  constructor(private router: Router) { }

  async ngOnInit() {

   // getStats();
   this.obtenerNumeroContenedoresLlenos();
   this.obtenerConsultas();
   this.obtenerReclamaciones();
   this.obtenerPeticiones();
  

  }

      async  obtenerNumeroContenedoresLlenos() {
        try {
          const numero = await getFullContainerStat();
          var elemento = document.getElementById("2");
      
          if (elemento) {
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
      
      async  obtenerPeticiones() {
        try {
          const numero = await getPetitionStat();
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
