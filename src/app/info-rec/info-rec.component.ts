import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Router } from '@angular/router'

@Component({
  selector: 'app-info-rec',
  templateUrl: './info-rec.component.html',
  styleUrls: ['./info-rec.component.scss'],
})
export class InfoRecComponent implements AfterViewInit {

  constructor(private router: Router) { }

  ngAfterViewInit() {
    // Configuración básica de Swiper
    const mySwiper = new Swiper('.swiper-container', {
      effect: 'cards',
      grabCursor: true,
      loop: true,
      pagination: {
      el: '.swiper-pagination', // Elemento que contendrá la paginación
      clickable: true, // Permite hacer clic en los puntos de paginación para navegar
      bulletClass: 'swiper-pagination-bullet', // Clase para cada punto de paginación
      bulletActiveClass: 'swiper-pagination-bullet-active', // Clase para el punto de paginación activo
      },
    });
  }

  ngOnInit():void{
    setTimeout(() => {
  }, 500);
  }

}
