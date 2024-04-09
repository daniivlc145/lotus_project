import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html'
})
export class TutorialComponent implements AfterViewInit {
  constructor() { }

  ngAfterViewInit() {
    this.initializeSwiper();
  }

  initializeSwiper() {
    new Swiper('.swiper-container', {
      // Configura aquí las opciones de Swiper según tu necesidad
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }
}
