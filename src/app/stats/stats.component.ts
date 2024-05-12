import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { getStats } from './stats.functions';
import { getFullContainerStat } from './stats.functions';

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
  

  }

      async  obtenerNumeroContenedoresLlenos() {
        try {
          const numero = await getFullContainerStat();
          var elemento = document.getElementById("2");
      
          if (elemento) {
            elemento.textContent = numero.toString(); // Asegúrate de convertir el número a cadena antes de asignarlo como texto
          } else {
            console.error("No se encontró el elemento con ID '2'");
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
