import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Router } from '@angular/router'

@Component({
  selector: 'app-info-rec',
  templateUrl: './info-rec.component.html',
  styleUrls: ['./info-rec.component.scss'],
})
export class InfoRecComponent implements AfterViewInit {

  mySwiper: Swiper | undefined; // Referencia a la instancia de Swiper

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.initSwiper(); // Inicializar Swiper al cargar la vista
  }

  private initSwiper() {
    if (this.mySwiper) {
      this.mySwiper.destroy(true, true); // Destruir la instancia existente de Swiper
    }
    // Configuración básica de Swiper
    this.mySwiper = new Swiper('.swiper-container', {
      effect: 'cards',
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      slidesPerGroup:3,
      pagination: {
        el: '.swiper-pagination', // Elemento que contendrá la paginación
        clickable: true, // Permite hacer clic en los puntos de paginación para navegar
        bulletClass: 'swiper-pagination-bullet', // Clase para cada punto de paginación
        bulletActiveClass: 'swiper-pagination-bullet-active', // Clase para el punto de paginación activo
      },
    });
  }

  goToInfoPage() {
    // Recargar la página actual
    this.initSwiper(); // Reinicializar Swiper después de recargar la página
    window.location.reload();
  }

  goToNuevaIncPage() {
    this.router.navigate(['/newI']);
  }

  goToMisPage() {
    this.router.navigate(['/misI']);
  }

  goToMapPage() {
    this.router.navigate(['/map']);
  }

  goToProfPage(){
    this.router.navigate(['/profUser']);
  }
}
