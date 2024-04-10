import { Component } from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {register} from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'lotus_project';
}
