import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-info-rec',
  templateUrl: './info-rec.component.html',
  styleUrls: ['./info-rec.component.scss'],
})
export class InfoRecComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    // Configuración básica de Swiper
    const mySwiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: true,
    });
  }
}
