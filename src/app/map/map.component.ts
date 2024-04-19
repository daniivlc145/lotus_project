import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent{
  selectAll = false;
 items = [
    { id: 'checkbox1', selected: false },
    { id: 'checkbox2', selected: false },
    { id: 'checkbox3', selected: false },
    { id: 'checkbox4', selected: false },
    { id: 'checkbox5', selected: false },
    { id: 'checkbox6', selected: false },
    { id: 'checkbox7', selected: false },
 ];

 toggleAll() {
    this.selectAll = !this.selectAll;
    this.items.forEach(item => item.selected = this.selectAll);
 }

}
